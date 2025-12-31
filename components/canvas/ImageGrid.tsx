"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Download, RefreshCw, ZoomIn, Star, StarOff } from "lucide-react";
import { getGenerations, getFavorites, addToFavorites, removeFromFavorites } from "@/lib/db/operations";
import { GeneratedImage } from "@/lib/types/models";
import { MODELS } from "@/lib/constants/models";

export default function ImageGrid() {
    const [images, setImages] = useState<Array<GeneratedImage & { id: string }>>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

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

    const toggleFavorite = async (id: string) => {
        if (favorites.includes(id)) {
            await removeFromFavorites(id);
            setFavorites(favorites.filter((f) => f !== id));
        } else {
            await addToFavorites(id);
            setFavorites([...favorites, id]);
        }
    };

    const downloadImage = async (url: string, filename: string) => {
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
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="aspect-square skeleton rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    if (images.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                        <ZoomIn className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary">No Images Yet</h2>
                    <p className="text-text-secondary max-w-md">
                        Start generating stunning AI images by entering a prompt and selecting a model!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-text-primary mb-2">Your Creations</h2>
                <p className="text-text-secondary">{images.length} images generated</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {images.map((image, index) => {
                    const model = MODELS.find((m) => m.id === image.modelId);
                    const isFavorite = favorites.includes(image.id);

                    return (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative aspect-square rounded-lg overflow-hidden glass border border-border hover:border-primary/50 transition-all"
                        >
                            <Image
                                src={image.url}
                                alt={image.prompt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />

                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                                {/* Top info */}
                                <div>
                                    {model && (
                                        <span className="inline-block px-2 py-1 text-xs rounded-full glass border border-primary text-primary mb-2">
                                            {model.name}
                                        </span>
                                    )}
                                    <p className="text-xs text-text-primary line-clamp-3">{image.prompt}</p>
                                </div>

                                {/* Bottom actions */}
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => downloadImage(image.url, `ai-image-${image.id}.png`)}
                                            className="p-2 glass rounded-lg hover:bg-surface-light transition-colors"
                                            title="Download"
                                        >
                                            <Download className="w-4 h-4 text-text-primary" />
                                        </button>
                                        <button
                                            onClick={() => toggleFavorite(image.id)}
                                            className="p-2 glass rounded-lg hover:bg-surface-light transition-colors"
                                            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                        >
                                            {isFavorite ? (
                                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            ) : (
                                                <StarOff className="w-4 h-4 text-text-primary" />
                                            )}
                                        </button>
                                    </div>

                                    <span className="text-xs text-text-tertiary">
                                        {new Date(image.timestamp).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
