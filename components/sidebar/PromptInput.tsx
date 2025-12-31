"use client";

import { useRef, useEffect } from "react";
import { Type } from "lucide-react";

interface PromptInputProps {
    value: string;
    onChange: (value: string) => void;
}

export default function PromptInput({ value, onChange }: PromptInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [value]);

    const charCount = value.length;
    const maxChars = 1500;
    const isNearLimit = charCount > maxChars * 0.8;

    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-text-primary">
                    Prompt
                </label>
                <span
                    className={`text-[9px] ${isNearLimit ? "text-yellow-500" : "text-text-tertiary"
                        }`}
                >
                    {charCount} / {maxChars}
                </span>
            </div>

            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                maxLength={maxChars}
                placeholder="Describe your image in detail..."
                className="w-full min-h-[80px] px-3 py-2 glass rounded-lg text-xs text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={3}
            />

            <p className="text-[9px] text-text-tertiary">
                💡 Be specific with details, style, and lighting
            </p>
        </div>
    );
}
