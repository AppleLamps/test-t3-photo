"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export default function Button({
    children,
    onClick,
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    className = "",
    type = "button",
}: ButtonProps) {
    const baseStyles = `
        relative inline-flex items-center justify-center gap-2.5
        font-semibold rounded-xl
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background
        disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
        overflow-hidden
    `;

    const variants = {
        primary: `
            bg-gradient-primary text-white
            shadow-lg shadow-primary/25
            hover:shadow-xl hover:shadow-primary/30
            before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/10 before:to-transparent
            after:absolute after:inset-0 after:bg-white/10 after:opacity-0 hover:after:opacity-100 after:transition-opacity
        `,
        secondary: `
            bg-surface-elevated text-text-primary
            border border-border
            hover:bg-surface-light hover:border-border
            shadow-sm
        `,
        ghost: `
            text-text-secondary
            hover:text-text-primary hover:bg-surface-elevated
        `,
        danger: `
            bg-gradient-to-r from-red-600 to-red-500 text-white
            shadow-lg shadow-red-600/25
            hover:shadow-xl hover:shadow-red-600/30
        `,
    };

    const sizes = {
        sm: "px-3.5 py-2 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
    };

    const loadingSpinnerSizes = {
        sm: "w-3.5 h-3.5",
        md: "w-4 h-4",
        lg: "w-5 h-5",
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            whileHover={disabled || loading ? {} : { scale: 1.02, y: -1 }}
            whileTap={disabled || loading ? {} : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            {/* Loading spinner */}
            {loading && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10"
                >
                    <Loader2 className={`${loadingSpinnerSizes[size]} animate-spin`} />
                </motion.div>
            )}

            {/* Button content */}
            <motion.span
                className="relative z-10 flex items-center gap-2"
                animate={{ opacity: loading ? 0.7 : 1 }}
            >
                {children}
            </motion.span>

            {/* Shine effect for primary variant */}
            {variant === "primary" && !disabled && !loading && (
                <motion.div
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    animate={{ translateX: ["100%", "-100%"] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 5,
                        ease: "easeInOut",
                    }}
                />
            )}
        </motion.button>
    );
}
