"use client";

import { useState, useEffect } from "react";
import { GenerationRequest } from "@/lib/types/models";
import { MODELS } from "@/lib/constants/models";

interface QueueItem {
    id: string;
    requestId: string;
    modelId: string;
    modelEndpoint: string;
    prompt: string;
    status: "queued" | "in_progress" | "completed" | "failed";
    progress: number;
    error?: string;
    result?: any;
}

export function useGenerationQueue() {
    const [queue, setQueue] = useState<QueueItem[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const submitGeneration = async (request: GenerationRequest) => {
        const model = MODELS.find((m) => m.id === request.modelId);
        if (!model) return;

        const queueItemId = `queue_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Prepare input based on model
        const input: any = {
            prompt: request.prompt,
        };

        // Add image size
        if (typeof request.imageSize === "string") {
            if (model.id === "minimax-image-01") {
                input.aspect_ratio = request.imageSize;
            } else {
                input.image_size = request.imageSize;
            }
        } else {
            input.image_size = request.imageSize;
        }

        // Add model-specific parameters
        if (request.guidanceScale !== undefined && model.parameters.supportsGuidanceScale) {
            input.guidance_scale = request.guidanceScale;
        }
        if (request.inferenceSteps !== undefined && model.parameters.supportsInferenceSteps) {
            input.num_inference_steps = request.inferenceSteps;
        }
        if (request.seed !== undefined && model.parameters.supportsSeed) {
            input.seed = request.seed;
        }
        if (request.numImages !== undefined && model.parameters.supportsNumImages) {
            input.num_images = request.numImages;
        }

        try {
            // Submit to API
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    modelEndpoint: model.endpoint,
                    input,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit generation");
            }

            const { requestId } = await response.json();

            // Add to queue
            const newItem: QueueItem = {
                id: queueItemId,
                requestId,
                modelId: model.id,
                modelEndpoint: model.endpoint,
                prompt: request.prompt,
                status: "queued",
                progress: 0,
            };

            setQueue((prev) => [...prev, newItem]);
            setIsGenerating(true);

            // Start polling
            pollStatus(queueItemId, requestId, model.endpoint);
        } catch (error: any) {
            console.error("Generation error:", error);
            setQueue((prev) =>
                prev.map((item) =>
                    item.id === queueItemId
                        ? { ...item, status: "failed", error: error.message }
                        : item
                )
            );
        }
    };

    const pollStatus = async (queueItemId: string, requestId: string, modelEndpoint: string) => {
        const maxAttempts = 60;
        let attempts = 0;

        const poll = async () => {
            try {
                const response = await fetch(
                    `/api/generate/status?requestId=${requestId}&modelEndpoint=${encodeURIComponent(
                        modelEndpoint
                    )}`
                );

                if (!response.ok) {
                    throw new Error("Failed to check status");
                }

                const status = await response.json();

                setQueue((prev) =>
                    prev.map((item) =>
                        item.id === queueItemId
                            ? {
                                ...item,
                                status: status.status === "COMPLETED" ? "completed" : "in_progress",
                                progress: status.progress || item.progress + 5,
                            }
                            : item
                    )
                );

                if (status.status === "COMPLETED") {
                    // Fetch result
                    const resultResponse = await fetch(
                        `/api/generate/result?requestId=${requestId}&modelEndpoint=${encodeURIComponent(
                            modelEndpoint
                        )}`
                    );
                    const result = await resultResponse.json();

                    setQueue((prev) =>
                        prev.map((item) =>
                            item.id === queueItemId
                                ? { ...item, status: "completed", result, progress: 100 }
                                : item
                        )
                    );

                    // Save to IndexedDB and refresh grid
                    if (result.data?.images) {
                        const { saveGeneration } = await import("@/lib/db/operations");
                        const model = MODELS.find((m) => m.id === item.modelId);

                        for (const img of result.data.images) {
                            await saveGeneration({
                                url: img.url,
                                width: img.width || 1024,
                                height: img.height || 1024,
                                contentType: img.content_type || "image/png",
                                modelId: item.modelId,
                                prompt: item.prompt,
                                seed: result.data.seed || 0,
                                timestamp: Date.now(),
                            });
                        }
                    }

                    setIsGenerating(false);
                    return;
                }

                attempts++;
                if (attempts < maxAttempts) {
                    setTimeout(poll, 2000);
                }
            } catch (error: any) {
                setQueue((prev) =>
                    prev.map((item) =>
                        item.id === queueItemId
                            ? { ...item, status: "failed", error: error.message }
                            : item
                    )
                );
                setIsGenerating(false);
            }
        };

        poll();
    };

    return {
        queue,
        isGenerating,
        submitGeneration,
    };
}
