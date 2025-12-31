"use client";

import { motion } from "framer-motion";
import { Check, Cpu, AlertCircle } from "lucide-react";
import { MODELS } from "@/lib/constants/models";

interface ModelSelectorProps {
    selected: string[];
    onChange: (models: string[]) => void;
}

export default function ModelSelector({ selected, onChange }: ModelSelectorProps) {
    const toggleModel = (modelId: string) => {
        if (selected.includes(modelId)) {
            onChange(selected.filter((id) => id !== modelId));
        } else {
            onChange([...selected, modelId]);
        }
    };

    return (
        <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                <Cpu className="w-4 h-4 text-primary" />
                AI Model
            </label>

            <div className="space-y-2">
                {MODELS.map((model, index) => {
                    const isSelected = selected.includes(model.id);

                    return (
                        <motion.button
                            key={model.id}
                            onClick={() => toggleModel(model.id)}
                            className={`group relative w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${
                                isSelected
                                    ? "border-primary/50 bg-primary/5"
                                    : "border-border-subtle bg-surface-elevated/30 hover:border-border hover:bg-surface-elevated/50"
                            }`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            {/* Selection indicator glow */}
                            {isSelected && (
                                <motion.div
                                    className="absolute -inset-px bg-gradient-primary rounded-xl opacity-10"
                                    layoutId="model-selector-glow"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}

                            {/* Checkbox */}
                            <motion.div
                                className={`relative flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                                    isSelected
                                        ? "bg-gradient-primary border-transparent"
                                        : "border-border group-hover:border-text-muted"
                                }`}
                                animate={{ scale: isSelected ? [1, 1.2, 1] : 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", bounce: 0.5 }}
                                    >
                                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* Model info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm font-medium transition-colors ${
                                        isSelected ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"
                                    }`}>
                                        {model.name}
                                    </span>
                                </div>
                                <span className="text-2xs text-text-muted">
                                    {model.provider}
                                </span>
                            </div>

                            {/* Status indicator */}
                            <div className={`w-2 h-2 rounded-full ${
                                isSelected ? "bg-success" : "bg-text-muted/30"
                            }`} />
                        </motion.button>
                    );
                })}
            </div>

            {selected.length > 1 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 p-2.5 rounded-lg bg-warning/10 border border-warning/20"
                >
                    <AlertCircle className="w-3.5 h-3.5 text-warning mt-0.5 flex-shrink-0" />
                    <p className="text-2xs text-warning">
                        Multi-model generation uses more API credits
                    </p>
                </motion.div>
            )}
        </div>
    );
}
