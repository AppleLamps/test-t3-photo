"use client";

import { Check } from "lucide-react";
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
        <div className="space-y-2">
            <label className="text-xs font-medium text-text-primary">
                Model Selection
            </label>

            <div className="space-y-1">
                {MODELS.map((model) => {
                    const isSelected = selected.includes(model.id);

                    return (
                        <button
                            key={model.id}
                            onClick={() => toggleModel(model.id)}
                            className={`w-full flex items-center gap-2 p-2 rounded-md border transition-all text-left ${isSelected
                                    ? "border-primary bg-primary/10"
                                    : "border-border glass hover:border-primary/50"
                                }`}
                        >
                            {/* Checkbox */}
                            <div
                                className={`flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center ${isSelected ? "bg-primary border-primary" : "border-border"
                                    }`}
                            >
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>

                            {/* Model info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-xs font-medium text-text-primary truncate">
                                        {model.name}
                                    </span>
                                    <span className="text-[9px] text-text-tertiary flex-shrink-0">
                                        {model.provider}
                                    </span>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {selected.length > 1 && (
                <p className="text-[9px] text-yellow-500">
                    ⚠️ Multi-model uses more API credits
                </p>
            )}
        </div>
    );
}
