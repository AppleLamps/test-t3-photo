"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
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
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 lg:hidden glass p-2 rounded-lg"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        initial={{ x: -400 }}
                        animate={{ x: 0 }}
                        exit={{ x: -400 }}
                        className="fixed lg:static inset-y-0 left-0 z-40 w-full sm:w-96 glass border-r border-border overflow-y-auto"
                    >
                        <div className="p-4 space-y-3">
                            {/* Header */}
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-base font-bold text-text-primary">AI Image Studio</h1>
                                    <p className="text-[9px] text-text-tertiary">Create stunning visuals</p>
                                </div>
                            </div>

                            {/* Prompt Input */}
                            <PromptInput value={prompt} onChange={onPromptChange} />

                            {/* Model Selection */}
                            <ModelSelector selected={selectedModels} onChange={onModelsChange} />

                            {/* Image Size */}
                            <ImageSizeSelector
                                selectedModels={selectedModels}
                                value={imageSize}
                                onChange={setImageSize}
                            />

                            {/* Style Presets */}
                            <StylePresets onSelectPreset={(preset) => onPromptChange(prompt + " " + preset)} />

                            {/* Advanced Settings */}
                            <AdvancedSettings
                                selectedModels={selectedModels}
                                values={advancedSettings}
                                onChange={setAdvancedSettings}
                            />

                            {/* Generate Button */}
                            <Button
                                onClick={handleGenerate}
                                disabled={!prompt || selectedModels.length === 0}
                                loading={isGenerating}
                                size="md"
                                className="w-full"
                            >
                                <Sparkles className="w-4 h-4" />
                                Generate Image{selectedModels.length > 1 ? "s" : ""}
                            </Button>

                            {selectedModels.length > 1 && (
                                <p className="text-[9px] text-text-tertiary text-center">
                                    Generating with {selectedModels.length} models
                                </p>
                            )}
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
