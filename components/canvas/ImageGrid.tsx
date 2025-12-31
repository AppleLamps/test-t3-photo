"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Download, Sparkles, Heart, ImageIcon, Calendar, Expand } from "lucide-react";
import { getGenerations, getFavorites, addToFavorites, removeFromFavorites } from "@/lib/db/operations";
import { GeneratedImage } from "@/lib/types/models";
import { MODELS } from "@/lib/constants/models";

export default function ImageGrid() {
    const [images, setImages] = useState<Array<GeneratedImage & { id: string }>>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        loadImages();
    }, []);

    const loadImages = async () => {
        setLoading(true);
        const gens = await getGenerations({ limit: 50 });
        const favs = await getFavorites();
        setImages(gens);
        setFavorites(favs);
        setLoading(false);
    };

    const toggleFavorite = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (favorites.includes(id)) {
            await removeFromFavorites(id);
            setFavorites(favorites.filter((f) => f !== id));
        } else {
            await addToFavorites(id);
            setFavorites([...favorites, id]);
        }
    };

    const downloadImage = async (e: React.MouseEvent, url: string, filename: string) => {
        e.stopPropagation();
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(blobUrl);
    };

    if (loading) {
        return (
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <div className="h-8 w-48 skeleton rounded-lg mb-2" />
                        <div className="h-4 w-32 skeleton rounded-lg" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="aspect-square skeleton rounded-2xl"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (images.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <motion.div
                    className="text-center space-y-6 max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative mx-auto w-24 h-24">
                        <div className="absolute inset-0 bg-gradient-primary rounded-3xl opacity-20 blur-2xl animate-pulse-soft" />
                        <div className="relative w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-glow">
                            <ImageIcon className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-text-primary">
                            Your canvas awaits
                        </h2>
                        <p className="text-text-secondary leading-relaxed">
                            Create your first masterpiece by entering a prompt and selecting an AI model. Your generated images will appear here.
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span>Start creating something amazing</span>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-text-primary tracking-tight">
                                    Your Creations
                                </h2>
                                <p className="text-sm text-text-tertiary">
                                    {images.length} {images.length === 1 ? "masterpiece" : "masterpieces"} generated
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {images.map((image, index) => {
                            const model = MODELS.find((m) => m.id === image.modelId);
                            const isFavorite = favorites.includes(image.id);

                            return (
                                <motion.div
                                    key={image.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        delay: index * 0.03,
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                    className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                                    onClick={() => setSelectedImage(image.id)}
                                >
                                    {/* Card glow effect */}
                                    <div className="absolute -inset-px bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Card border */}
                                    <div className="absolute inset-0 rounded-2xl border border-border/50 group-hover:border-primary/30 transition-colors duration-300" />

                                    {/* Image */}
                                    <div className="absolute inset-[1px] rounded-2xl overflow-hidden bg-surface">
                                        <Image
                                            src={image.url}
                                            alt={image.prompt}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        />

                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                                        {/* Top actions */}
                                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                            <motion.button
                                                onClick={(e) => toggleFavorite(e, image.id)}
                                                className="p-2 glass-card rounded-xl hover:bg-surface-light transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                            >
                                                <Heart
                                                    className={`w-4 h-4 transition-colors ${
                                                        isFavorite
                                                            ? "text-accent fill-accent"
                                                            : "text-white"
                                                    }`}
                                                />
                                            </motion.button>
                                            <motion.button
                                                onClick={(e) => downloadImage(e, image.url, `ai-image-${image.id}.png`)}
                                                className="p-2 glass-card rounded-xl hover:bg-surface-light transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                title="Download"
                                            >
                                                <Download className="w-4 h-4 text-white" />
                                            </motion.button>
                                        </div>

                                        {/* Bottom info */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                            {model && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-2xs font-medium rounded-full bg-primary/20 text-primary-light border border-primary/30 mb-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                    {model.name}
                                                </span>
                                            )}
                                            <p className="text-xs text-white/90 line-clamp-2 leading-relaxed">
                                                {image.prompt}
                                            </p>
                                            <div className="flex items-center gap-1.5 mt-2 text-2xs text-white/60">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(image.timestamp).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </div>

                                        {/* Expand indicator */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <motion.div
                                                className="p-3 glass-card rounded-2xl"
                                                initial={{ scale: 0.5 }}
                                                whileHover={{ scale: 1 }}
                                            >
                                                <Expand className="w-5 h-5 text-white" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Favorite indicator (always visible if favorited) */}
                                    {isFavorite && (
                                        <div className="absolute top-3 left-3 p-1.5 bg-accent/20 backdrop-blur-sm rounded-lg border border-accent/30">
                                            <Heart className="w-3.5 h-3.5 text-accent fill-accent" />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        {(() => {
                            const image = images.find((img) => img.id === selectedImage);
                            if (!image) return null;
                            const model = MODELS.find((m) => m.id === image.modelId);
                            const isFavorite = favorites.includes(image.id);

                            return (
                                <motion.div
                                    className="relative max-w-5xl max-h-[90vh] w-full"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="relative aspect-auto max-h-[70vh] rounded-2xl overflow-hidden glass-card">
                                        <Image
                                            src={image.url}
                                            alt={image.prompt}
                                            width={1024}
                                            height={1024}
                                            className="object-contain w-full h-full"
                                            priority
                                        />
                                    </div>

                                    {/* Info panel */}
                                    <div className="mt-4 p-4 glass-card rounded-xl">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                {model && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary-light border border-primary/30 mb-2">
                                                        {model.name}
                                                    </span>
                                                )}
                                                <p className="text-sm text-text-primary leading-relaxed">
                                                    {image.prompt}
                                                </p>
                                                <p className="text-xs text-text-muted mt-2">
                                                    {new Date(image.timestamp).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <motion.button
                                                    onClick={(e) => toggleFavorite(e, image.id)}
                                                    className="p-3 glass rounded-xl hover:bg-surface-light transition-colors"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Heart
                                                        className={`w-5 h-5 ${
                                                            isFavorite
                                                                ? "text-accent fill-accent"
                                                                : "text-text-primary"
                                                        }`}
                                                    />
                                                </motion.button>
                                                <motion.button
                                                    onClick={(e) => downloadImage(e, image.url, `ai-image-${image.id}.png`)}
                                                    className="p-3 bg-gradient-primary rounded-xl hover:shadow-glow transition-all"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Download className="w-5 h-5 text-white" />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
