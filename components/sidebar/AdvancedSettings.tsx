"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Settings } from "lucide-react";
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
        <div className="space-y-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 glass rounded-lg hover:bg-surface-light transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm font-medium text-text-primary">Advanced Settings</span>
                </div>
                {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-text-secondary" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-text-secondary" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-4 overflow-hidden"
                    >
                        {showGuidanceScale && (
                            <div>
                                <label className="text-xs text-text-secondary mb-2 block">
                                    Guidance Scale: {values.guidanceScale || 3.5}
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    step="0.5"
                                    value={values.guidanceScale || 3.5}
                                    onChange={(e) =>
                                        onChange({ ...values, guidanceScale: parseFloat(e.target.value) })
                                    }
                                    className="w-full accent-primary"
                                />
                            </div>
                        )}

                        {showInferenceSteps && (
                            <div>
                                <label className="text-xs text-text-secondary mb-2 block">
                                    Inference Steps: {values.inferenceSteps || 4}
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    value={values.inferenceSteps || 4}
                                    onChange={(e) =>
                                        onChange({ ...values, inferenceSteps: parseInt(e.target.value) })
                                    }
                                    className="w-full px-3 py-2 glass rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        )}

                        {showSeed && (
                            <div>
                                <label className="text-xs text-text-secondary mb-2 block">
                                    Seed (optional, for reproducibility)
                                </label>
                                <input
                                    type="number"
                                    placeholder="Random"
                                    value={values.seed || ""}
                                    onChange={(e) =>
                                        onChange({
                                            ...values,
                                            seed: e.target.value ? parseInt(e.target.value) : undefined,
                                        })
                                    }
                                    className="w-full px-3 py-2 glass rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        )}

                        {showNumImages && (
                            <div>
                                <label className="text-xs text-text-secondary mb-2 block">
                                    Number of Images: {values.numImages || 1}
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="4"
                                    step="1"
                                    value={values.numImages || 1}
                                    onChange={(e) =>
                                        onChange({ ...values, numImages: parseInt(e.target.value) })
                                    }
                                    className="w-full accent-primary"
                                />
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
