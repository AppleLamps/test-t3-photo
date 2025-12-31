"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import ImageGrid from "@/components/canvas/ImageGrid";
import GenerationQueue from "@/components/generation/GenerationQueue";
import { ToastContainer, useToast } from "@/components/ui/Toast";
import { GenerationRequest } from "@/lib/types/models";
import { useGenerationQueue } from "@/hooks/useGenerationQueue";

export default function Home() {
    const [selectedModels, setSelectedModels] = useState<string[]>(["flux-schnell"]);
    const [prompt, setPrompt] = useState("");
    const { queue, isGenerating, submitGeneration } = useGenerationQueue();
    const { toasts, dismissToast, success, error } = useToast();

    const handleGenerate = async (request: GenerationRequest) => {
        try {
            await submitGeneration(request);
            success("Generation started! Your image will appear shortly.");
        } catch (err: any) {
            error(`Failed to start generation: ${err.message}`);
        }
    };

    return (
        <>
            <main className="flex h-screen overflow-hidden bg-background">
                {/* Sidebar */}
                <Sidebar
                    selectedModels={selectedModels}
                    onModelsChange={setSelectedModels}
                    prompt={prompt}
                    onPromptChange={setPrompt}
                    onGenerate={handleGenerate}
                    isGenerating={isGenerating}
                />

                {/* Main Canvas Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Generation Queue (if active) */}
                    {queue.length > 0 && <GenerationQueue />}

                    {/* Image Grid */}
                    <ImageGrid key={queue.filter((q) => q.status === "completed").length} />
                </div>
            </main>

            {/* Toast Notifications */}
            <ToastContainer toasts={toasts} onDismiss={dismissToast} />
        </>
    );
}
