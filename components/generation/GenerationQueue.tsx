"use client";

import { motion } from "framer-motion";
import { Loader2, Clock, Sparkles } from "lucide-react";

interface QueueItem {
    id: string;
    modelName: string;
    prompt: string;
    progress: number;
    status: string;
    estimatedTime?: number;
}

export default function GenerationQueue() {
    // This is a placeholder - actual queue management will be in hooks
    const queueItems: QueueItem[] = [
        {
            id: "1",
            modelName: "FLUX.1 [schnell]",
            prompt: "A beautiful sunset over the mountains",
            progress: 45,
            status: "Generating...",
            estimatedTime: 15,
        },
    ];

    if (queueItems.length === 0) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 border-b border-border/50 glass-subtle"
        >
            <div className="max-w-7xl mx-auto space-y-4">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className="absolute -inset-1 bg-gradient-primary rounded-lg opacity-30 blur-md animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-text-primary">
                            Generation in Progress
                        </h3>
                        <p className="text-2xs text-text-muted">
                            {queueItems.length} {queueItems.length === 1 ? "image" : "images"} in queue
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    {queueItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card rounded-xl p-4"
                        >
                            <div className="flex items-start gap-4">
                                {/* Animated loader icon */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center">
                                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                                    </div>
                                    <motion.div
                                        className="absolute -inset-1 bg-gradient-primary rounded-xl opacity-20 blur-lg"
                                        animate={{
                                            opacity: [0.2, 0.4, 0.2],
                                            scale: [1, 1.05, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />
                                </div>

                                <div className="flex-1 min-w-0 space-y-3">
                                    {/* Header */}
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-2xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                            {item.modelName}
                                        </span>
                                        {item.estimatedTime && (
                                            <span className="flex items-center gap-1.5 text-2xs text-text-muted">
                                                <Clock className="w-3.5 h-3.5" />
                                                ~{item.estimatedTime}s remaining
                                            </span>
                                        )}
                                    </div>

                                    {/* Prompt */}
                                    <p className="text-sm text-text-secondary line-clamp-1">
                                        {item.prompt}
                                    </p>

                                    {/* Progress bar */}
                                    <div className="space-y-1.5">
                                        <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.progress}%` }}
                                                className="h-full bg-gradient-primary relative"
                                                transition={{ duration: 0.5, ease: "easeOut" }}
                                            >
                                                {/* Shimmer effect */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                                            </motion.div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-2xs text-text-muted">
                                                {item.status}
                                            </span>
                                            <span className="text-2xs font-medium text-primary tabular-nums">
                                                {item.progress}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
