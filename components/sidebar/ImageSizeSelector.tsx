"use client";

import { Maximize2, Square } from "lucide-react";
import { getCommonSizes } from "@/lib/constants/models";

interface ImageSizeSelectorProps {
    selectedModels: string[];
    value: string;
    onChange: (size: string) => void;
}

export default function ImageSizeSelector({
    selectedModels,
    value,
    onChange,
}: ImageSizeSelectorProps) {
    const availableSizes = getCommonSizes(selectedModels);

    if (availableSizes.length === 0) {
        return (
            <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary flex items-center gap-2">
                    <Maximize2 className="w-4 h-4" />
                    Image Size
                </label>
                <p className="text-xs text-text-tertiary">Select a model first</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-text-primary">
                Image Size
            </label>

            <div className="grid grid-cols-3 gap-1">
                {availableSizes.map((size) => {
                    const isSelected = value === size.id || value === size.value;

                    return (
                        <button
                            key={size.id}
                            onClick={() => onChange(size.value as string)}
                            className={`p-1.5 rounded-md border transition-all ${isSelected
                                    ? "border-primary bg-primary/10"
                                    : "border-border glass hover:border-primary/50"
                                }`}
                        >
                            <div className="flex flex-col items-center gap-1">
                                <Square className="w-4 h-4 text-text-secondary" />
                                <div className="text-center">
                                    <p className="text-[9px] font-medium text-text-primary leading-tight">{size.label}</p>
                                    <p className="text-[8px] text-text-tertiary">{size.aspectRatio}</p>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {selectedModels.length > 1 && availableSizes.length < 6 && (
                <p className="text-[9px] text-text-tertiary">
                    ℹ️ Compatible sizes only
                </p>
            )}
        </div>
    );
}
