"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {/* Primary gradient orb */}
                <motion.div
                    className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full opacity-30"
                    style={{
                        background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                {/* Accent gradient orb */}
                <motion.div
                    className="absolute -bottom-[30%] -right-[20%] w-[70%] h-[70%] rounded-full opacity-20"
                    style={{
                        background: "radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)",
                    }}
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            <main className="relative flex h-screen overflow-hidden">
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
