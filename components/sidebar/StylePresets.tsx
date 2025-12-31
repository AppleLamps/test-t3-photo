"use client";

import { Palette } from "lucide-react";
import { STYLE_PRESETS } from "@/lib/constants/style-presets";

interface StylePresetsProps {
    onSelectPreset: (prompt: string) => void;
}

export default function StylePresets({ onSelectPreset }: StylePresetsProps) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-medium text-text-primary">
                Style Presets
            </label>

            <select
                onChange={(e) => {
                    if (e.target.value) {
                        const preset = STYLE_PRESETS.find((p) => p.id === e.target.value);
                        if (preset) {
                            onSelectPreset(preset.prompt);
                        }
                    }
                }}
                className="w-full px-2 py-1.5 glass rounded-lg text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                defaultValue=""
            >
                <option value="">Choose a style...</option>
                {STYLE_PRESETS.map((preset) => (
                    <option key={preset.id} value={preset.id}>
                        {preset.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
