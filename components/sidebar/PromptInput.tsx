"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Lightbulb } from "lucide-react";

interface PromptInputProps {
    value: string;
    onChange: (value: string) => void;
}

export default function PromptInput({ value, onChange }: PromptInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
        }
    }, [value]);

    const charCount = value.length;
    const maxChars = 1500;
    const isNearLimit = charCount > maxChars * 0.8;
    const progressPercent = (charCount / maxChars) * 100;

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Prompt
                </label>
                <motion.span
                    className={`text-2xs font-medium tabular-nums ${
                        isNearLimit ? "text-warning" : "text-text-muted"
                    }`}
                    animate={{ scale: isNearLimit ? [1, 1.05, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {charCount.toLocaleString()} / {maxChars.toLocaleString()}
                </motion.span>
            </div>

            <div className="relative">
                {/* Glow effect when focused */}
                <motion.div
                    className="absolute -inset-0.5 bg-gradient-primary rounded-xl opacity-0 blur-md"
                    animate={{ opacity: isFocused ? 0.15 : 0 }}
                    transition={{ duration: 0.2 }}
                />

                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    maxLength={maxChars}
                    placeholder="Describe your image in vivid detail... Include style, mood, lighting, colors, and composition."
                    className="relative w-full min-h-[100px] px-4 py-3 bg-surface-elevated/50 border border-border-subtle rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 focus:bg-surface-light/50 resize-none transition-all duration-200"
                    rows={4}
                />

                {/* Character progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border-subtle rounded-b-xl overflow-hidden">
                    <motion.div
                        className={`h-full ${
                            isNearLimit
                                ? "bg-gradient-to-r from-warning to-error"
                                : "bg-gradient-to-r from-primary to-accent"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.2 }}
                    />
                </div>
            </div>

            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-surface/50 border border-border-subtle">
                <Lightbulb className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-2xs text-text-tertiary leading-relaxed">
                    Tip: Be specific with details like art style, lighting conditions, camera angle, and mood for best results.
                </p>
            </div>
        </div>
    );
}
