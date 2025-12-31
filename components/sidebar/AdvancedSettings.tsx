"use client";

import { useState } from "react";
import { ChevronDown, Settings2, Sliders, Hash, Images } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supportsParameter } from "@/lib/constants/models";

interface AdvancedSettingsProps {
    selectedModels: string[];
    values: {
        guidanceScale?: number;
        inferenceSteps?: number;
        seed?: number;
        numImages?: number;
    };
    onChange: (values: any) => void;
}

export default function AdvancedSettings({
    selectedModels,
    values,
    onChange,
}: AdvancedSettingsProps) {
    const [isOpen, setIsOpen] = useState(false);

    const showGuidanceScale = supportsParameter(selectedModels, "supportsGuidanceScale");
    const showInferenceSteps = supportsParameter(selectedModels, "supportsInferenceSteps");
    const showSeed = supportsParameter(selectedModels, "supportsSeed");
    const showNumImages = supportsParameter(selectedModels, "supportsNumImages");

    const hasAnySettings = showGuidanceScale || showInferenceSteps || showSeed || showNumImages;

    if (!hasAnySettings) {
        return null;
    }

    return (
        <div className="space-y-3">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 ${
                    isOpen
                        ? "border-primary/50 bg-primary/5"
                        : "border-border-subtle bg-surface-elevated/30 hover:border-border hover:bg-surface-elevated/50"
                }`}
                whileTap={{ scale: 0.99 }}
            >
                <div className="flex items-center gap-2">
                    <Settings2 className={`w-4 h-4 transition-colors ${isOpen ? "text-primary" : "text-text-secondary"}`} />
                    <span className="text-sm font-medium text-text-primary">Advanced Settings</span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-4 h-4 text-text-muted" />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 rounded-xl bg-surface-elevated/30 border border-border-subtle space-y-5">
                            {showGuidanceScale && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 }}
                                    className="space-y-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 text-xs text-text-secondary">
                                            <Sliders className="w-3.5 h-3.5" />
                                            Guidance Scale
                                        </label>
                                        <span className="text-xs font-medium text-primary tabular-nums">
                                            {values.guidanceScale || 3.5}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="20"
                                        step="0.5"
                                        value={values.guidanceScale || 3.5}
                                        onChange={(e) =>
                                            onChange({ ...values, guidanceScale: parseFloat(e.target.value) })
                                        }
                                        className="w-full"
                                    />
                                    <p className="text-2xs text-text-muted">
                                        Higher values = more adherence to prompt
                                    </p>
                                </motion.div>
                            )}

                            {showInferenceSteps && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="space-y-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 text-xs text-text-secondary">
                                            <Sliders className="w-3.5 h-3.5" />
                                            Inference Steps
                                        </label>
                                        <span className="text-xs font-medium text-primary tabular-nums">
                                            {values.inferenceSteps || 4}
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        min="1"
                                        max="20"
                                        value={values.inferenceSteps || 4}
                                        onChange={(e) =>
                                            onChange({ ...values, inferenceSteps: parseInt(e.target.value) })
                                        }
                                        className="w-full px-3 py-2.5 bg-surface border border-border-subtle rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                    <p className="text-2xs text-text-muted">
                                        More steps = higher quality, slower generation
                                    </p>
                                </motion.div>
                            )}

                            {showSeed && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                    className="space-y-2"
                                >
                                    <label className="flex items-center gap-2 text-xs text-text-secondary">
                                        <Hash className="w-3.5 h-3.5" />
                                        Seed (optional)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Random seed"
                                        value={values.seed || ""}
                                        onChange={(e) =>
                                            onChange({
                                                ...values,
                                                seed: e.target.value ? parseInt(e.target.value) : undefined,
                                            })
                                        }
                                        className="w-full px-3 py-2.5 bg-surface border border-border-subtle rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                    <p className="text-2xs text-text-muted">
                                        Use the same seed to reproduce results
                                    </p>
                                </motion.div>
                            )}

                            {showNumImages && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="space-y-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 text-xs text-text-secondary">
                                            <Images className="w-3.5 h-3.5" />
                                            Number of Images
                                        </label>
                                        <span className="text-xs font-medium text-primary tabular-nums">
                                            {values.numImages || 1}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="4"
                                        step="1"
                                        value={values.numImages || 1}
                                        onChange={(e) =>
                                            onChange({ ...values, numImages: parseInt(e.target.value) })
                                        }
                                        className="w-full"
                                    />
                                    <p className="text-2xs text-text-muted">
                                        Generate multiple variations at once
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
