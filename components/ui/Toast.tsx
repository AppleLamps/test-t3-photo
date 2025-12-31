"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

export interface Toast {
    id: string;
    type: "success" | "error" | "info" | "warning";
    message: string;
    duration?: number;
}

interface ToastProps {
    toast: Toast;
    onDismiss: (id: string) => void;
}

const toastConfig = {
    success: {
        icon: CheckCircle,
        color: "text-emerald-400",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/20",
        glowColor: "shadow-emerald-500/10",
    },
    error: {
        icon: AlertCircle,
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/20",
        glowColor: "shadow-red-500/10",
    },
    info: {
        icon: Info,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
        glowColor: "shadow-blue-500/10",
    },
    warning: {
        icon: AlertTriangle,
        color: "text-amber-400",
        bgColor: "bg-amber-500/10",
        borderColor: "border-amber-500/20",
        glowColor: "shadow-amber-500/10",
    },
};

function ToastItem({ toast, onDismiss }: ToastProps) {
    const config = toastConfig[toast.type];
    const Icon = config.icon;
    const duration = toast.duration || 5000;
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
            setProgress(remaining);

            if (remaining === 0) {
                clearInterval(interval);
            }
        }, 50);

        const timer = setTimeout(() => {
            onDismiss(toast.id);
        }, duration);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [toast, onDismiss, duration]);

    return (
        <motion.div
            layout
            initial={{ x: 400, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 400, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`
                relative overflow-hidden
                glass-card ${config.borderColor}
                flex items-start gap-3 p-4 rounded-xl
                shadow-lg ${config.glowColor}
                min-w-[340px] max-w-md
            `}
        >
            {/* Icon container */}
            <div className={`flex-shrink-0 p-1.5 rounded-lg ${config.bgColor}`}>
                <Icon className={`w-4 h-4 ${config.color}`} />
            </div>

            {/* Message */}
            <p className="flex-1 text-sm text-text-primary leading-relaxed pt-0.5">
                {toast.message}
            </p>

            {/* Dismiss button */}
            <motion.button
                onClick={() => onDismiss(toast.id)}
                className="flex-shrink-0 p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-light transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <X className="w-4 h-4" />
            </motion.button>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border-subtle overflow-hidden">
                <motion.div
                    className={`h-full ${config.color.replace('text-', 'bg-')}`}
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.05 }}
                />
            </div>
        </motion.div>
    );
}

interface ToastContainerProps {
    toasts: Toast[];
    onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
                ))}
            </AnimatePresence>
        </div>
    );
}

// Hook for managing toasts
export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (type: Toast["type"], message: string, duration?: number) => {
        const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newToast: Toast = { id, type, message, duration };
        setToasts((prev) => [...prev, newToast]);
    };

    const dismissToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return {
        toasts,
        showToast,
        dismissToast,
        success: (msg: string, duration?: number) => showToast("success", msg, duration),
        error: (msg: string, duration?: number) => showToast("error", msg, duration),
        info: (msg: string, duration?: number) => showToast("info", msg, duration),
        warning: (msg: string, duration?: number) => showToast("warning", msg, duration),
    };
}
