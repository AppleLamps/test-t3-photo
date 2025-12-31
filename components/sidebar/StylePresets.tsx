"use client";

import { motion } from "framer-motion";
import { Palette, ChevronDown } from "lucide-react";
import { STYLE_PRESETS } from "@/lib/constants/style-presets";
import { useState, useRef, useEffect } from "react";

interface StylePresetsProps {
    onSelectPreset: (prompt: string) => void;
}

export default function StylePresets({ onSelectPreset }: StylePresetsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (preset: typeof STYLE_PRESETS[0]) => {
        setSelectedPreset(preset.id);
        onSelectPreset(preset.prompt);
        setIsOpen(false);
    };

    const selectedPresetName = selectedPreset
        ? STYLE_PRESETS.find((p) => p.id === selectedPreset)?.name
        : null;

    return (
        <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                <Palette className="w-4 h-4 text-primary" />
                Style Preset
            </label>

            <div className="relative" ref={dropdownRef}>
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 text-left ${
                        isOpen
                            ? "border-primary/50 bg-surface-light"
                            : "border-border-subtle bg-surface-elevated/30 hover:border-border hover:bg-surface-elevated/50"
                    }`}
                    whileTap={{ scale: 0.99 }}
                >
                    <span className={`text-sm ${selectedPresetName ? "text-text-primary" : "text-text-muted"}`}>
                        {selectedPresetName || "Choose a style..."}
                    </span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="w-4 h-4 text-text-muted" />
                    </motion.div>
                </motion.button>

                {/* Dropdown */}
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isOpen ? 1 : 0,
                        y: isOpen ? 0 : -10,
                        pointerEvents: isOpen ? "auto" : "none",
                    }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-20 w-full mt-2 py-2 glass-card rounded-xl border border-border/50 shadow-elevated-lg max-h-60 overflow-y-auto"
                >
                    {STYLE_PRESETS.map((preset, index) => (
                        <motion.button
                            key={preset.id}
                            onClick={() => handleSelect(preset)}
                            className={`w-full px-4 py-2.5 text-left transition-colors ${
                                selectedPreset === preset.id
                                    ? "bg-primary/10 text-text-primary"
                                    : "text-text-secondary hover:bg-surface-light hover:text-text-primary"
                            }`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.02 }}
                        >
                            <span className="text-sm font-medium">{preset.name}</span>
                        </motion.button>
                    ))}
                </motion.div>
            </div>

            <p className="text-2xs text-text-muted">
                Select a style to append keywords to your prompt
            </p>
        </div>
    );
}
