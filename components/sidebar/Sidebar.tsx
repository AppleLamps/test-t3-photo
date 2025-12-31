"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Wand2 } from "lucide-react";
import { GenerationRequest } from "@/lib/types/models";
import PromptInput from "./PromptInput";
import ModelSelector from "./ModelSelector";
import ImageSizeSelector from "./ImageSizeSelector";
import AdvancedSettings from "./AdvancedSettings";
import StylePresets from "./StylePresets";
import Button from "../ui/Button";

interface SidebarProps {
    selectedModels: string[];
    onModelsChange: (models: string[]) => void;
    prompt: string;
    onPromptChange: (prompt: string) => void;
    onGenerate: (request: GenerationRequest) => void;
    isGenerating: boolean;
}

export default function Sidebar({
    selectedModels,
    onModelsChange,
    prompt,
    onPromptChange,
    onGenerate,
    isGenerating,
}: SidebarProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [imageSize, setImageSize] = useState<string>("landscape_4_3");
    const [advancedSettings, setAdvancedSettings] = useState({
        guidanceScale: 3.5,
        inferenceSteps: 4,
        seed: undefined as number | undefined,
        numImages: 1,
    });

    const handleGenerate = () => {
        selectedModels.forEach((modelId) => {
            const request: GenerationRequest = {
                modelId,
                prompt,
                imageSize,
                ...advancedSettings,
            };
            onGenerate(request);
        });
    };

    return (
        <>
            {/* Mobile toggle button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 lg:hidden glass-card p-2.5 rounded-xl shadow-elevated"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {isOpen ? (
                    <X className="w-5 h-5 text-text-primary" />
                ) : (
                    <Menu className="w-5 h-5 text-text-primary" />
                )}
            </motion.button>

            {/* Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        initial={{ x: -420, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -420, opacity: 0 }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed lg:static inset-y-0 left-0 z-40 w-full sm:w-[380px] glass-card border-r border-border/50 overflow-hidden flex flex-col"
                    >
                        {/* Sidebar Inner Glow */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/5 to-transparent" />
                        </div>

                        {/* Scrollable Content */}
                        <div className="relative flex-1 overflow-y-auto px-5 py-6">
                            <div className="space-y-6">
                                {/* Header */}
                                <motion.div
                                    className="flex items-center gap-3"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="relative">
                                        <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                                            <Wand2 className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="absolute -inset-1 bg-gradient-primary rounded-xl opacity-20 blur-lg" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-semibold text-text-primary tracking-tight">
                                            AI Image Studio
                                        </h1>
                                        <p className="text-xs text-text-tertiary">
                                            Create stunning visuals with AI
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Divider */}
                                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                                {/* Prompt Input */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                >
                                    <PromptInput value={prompt} onChange={onPromptChange} />
                                </motion.div>

                                {/* Model Selection */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <ModelSelector selected={selectedModels} onChange={onModelsChange} />
                                </motion.div>

                                {/* Image Size */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 }}
                                >
                                    <ImageSizeSelector
                                        selectedModels={selectedModels}
                                        value={imageSize}
                                        onChange={setImageSize}
                                    />
                                </motion.div>

                                {/* Style Presets */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <StylePresets onSelectPreset={(preset) => onPromptChange(prompt + " " + preset)} />
                                </motion.div>

                                {/* Advanced Settings */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 }}
                                >
                                    <AdvancedSettings
                                        selectedModels={selectedModels}
                                        values={advancedSettings}
                                        onChange={setAdvancedSettings}
                                    />
                                </motion.div>
                            </div>
                        </div>

                        {/* Generate Button - Fixed at bottom */}
                        <motion.div
                            className="relative p-5 border-t border-border/50 bg-gradient-to-t from-surface/80 to-transparent backdrop-blur-sm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Button
                                onClick={handleGenerate}
                                disabled={!prompt || selectedModels.length === 0}
                                loading={isGenerating}
                                size="lg"
                                className="w-full"
                            >
                                <Sparkles className="w-5 h-5" />
                                Generate{selectedModels.length > 1 ? ` with ${selectedModels.length} models` : ""}
                            </Button>

                            {selectedModels.length > 1 && (
                                <p className="text-2xs text-text-muted text-center mt-2.5">
                                    Multi-model generation uses more API credits
                                </p>
                            )}
                        </motion.div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
