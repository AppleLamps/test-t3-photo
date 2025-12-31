"use client";

import { motion } from "framer-motion";
import { Loader2, Clock } from "lucide-react";

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
        <div className="p-4 border-b border-border glass">
            <div className="max-w-7xl mx-auto space-y-3">
                <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generation Queue ({queueItems.length})
                </h3>

                {queueItems.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-light rounded-lg p-4"
                    >
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center animate-pulse">
                                <Loader2 className="w-6 h-6 text-white animate-spin" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-medium text-primary">{item.modelName}</span>
                                    {item.estimatedTime && (
                                        <span className="text-xs text-text-tertiary flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            ~{item.estimatedTime}s
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-text-primary truncate mb-2">{item.prompt}</p>

                                {/* Progress bar */}
                                <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.progress}%` }}
                                        className="h-full bg-gradient-primary"
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>

                                <p className="text-xs text-text-tertiary mt-1">{item.status}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
