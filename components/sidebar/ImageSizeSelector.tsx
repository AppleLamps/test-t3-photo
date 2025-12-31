"use client";

import { motion } from "framer-motion";
import { Ratio, Info } from "lucide-react";
import { getCommonSizes } from "@/lib/constants/models";

interface ImageSizeSelectorProps {
    selectedModels: string[];
    value: string;
    onChange: (size: string) => void;
}

// Aspect ratio visual representations
const aspectIcons: Record<string, { width: number; height: number }> = {
    "1:1": { width: 16, height: 16 },
    "4:3": { width: 16, height: 12 },
    "3:4": { width: 12, height: 16 },
    "16:9": { width: 16, height: 9 },
    "9:16": { width: 9, height: 16 },
    "3:2": { width: 15, height: 10 },
    "2:3": { width: 10, height: 15 },
    "21:9": { width: 21, height: 9 },
};

export default function ImageSizeSelector({
    selectedModels,
    value,
    onChange,
}: ImageSizeSelectorProps) {
    const availableSizes = getCommonSizes(selectedModels);

    if (availableSizes.length === 0) {
        return (
            <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                    <Ratio className="w-4 h-4 text-primary" />
                    Aspect Ratio
                </label>
                <div className="p-3 rounded-xl bg-surface-elevated/30 border border-border-subtle">
                    <p className="text-xs text-text-muted text-center">Select a model first</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                <Ratio className="w-4 h-4 text-primary" />
                Aspect Ratio
            </label>

            <div className="grid grid-cols-3 gap-2">
                {availableSizes.map((size, index) => {
                    const isSelected = value === size.id || value === size.value;
                    const aspect = aspectIcons[size.aspectRatio] || { width: 12, height: 12 };
                    const scale = 20 / Math.max(aspect.width, aspect.height);

                    return (
                        <motion.button
                            key={size.id}
                            onClick={() => onChange(size.value as string)}
                            className={`relative p-3 rounded-xl border transition-all duration-200 ${
                                isSelected
                                    ? "border-primary/50 bg-primary/5"
                                    : "border-border-subtle bg-surface-elevated/30 hover:border-border hover:bg-surface-elevated/50"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                        >
                            {/* Selection glow */}
                            {isSelected && (
                                <motion.div
                                    className="absolute -inset-px bg-gradient-primary rounded-xl opacity-10"
                                    layoutId="size-selector-glow"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}

                            <div className="relative flex flex-col items-center gap-2">
                                {/* Aspect ratio visual */}
                                <div
                                    className={`rounded-sm transition-colors ${
                                        isSelected ? "bg-primary" : "bg-text-muted/30"
                                    }`}
                                    style={{
                                        width: aspect.width * scale,
                                        height: aspect.height * scale,
                                    }}
                                />

                                {/* Label */}
                                <div className="text-center">
                                    <p className={`text-2xs font-medium transition-colors ${
                                        isSelected ? "text-text-primary" : "text-text-secondary"
                                    }`}>
                                        {size.label}
                                    </p>
                                    <p className="text-2xs text-text-muted">
                                        {size.aspectRatio}
                                    </p>
                                </div>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {selectedModels.length > 1 && availableSizes.length < 6 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-2xs text-text-muted"
                >
                    <Info className="w-3 h-3" />
                    <span>Showing compatible sizes for selected models</span>
                </motion.div>
            )}
        </div>
    );
}
