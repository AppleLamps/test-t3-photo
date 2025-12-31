import { StylePreset } from "../types/models";

export const STYLE_PRESETS: StylePreset[] = [
    {
        id: "photorealistic",
        name: "Photorealistic",
        prompt: "photorealistic, hyper-detailed, 8k uhd, professional photography, DSLR, natural lighting",
        icon: "Camera",
    },
    {
        id: "artistic",
        name: "Artistic",
        prompt: "artistic, painterly, expressive brushstrokes, vibrant colors, masterpiece, fine art",
        icon: "Palette",
    },
    {
        id: "anime",
        name: "Anime",
        prompt: "anime style, manga, cel shaded, vibrant colors, detailed character design",
        icon: "Sparkles",
    },
    {
        id: "abstract",
        name: "Abstract",
        prompt: "abstract art, surreal, dreamlike, creative composition, unique perspective",
        icon: "Shapes",
    },
    {
        id: "cinematic",
        name: "Cinematic",
        prompt: "cinematic lighting, dramatic atmosphere, movie still, film grain, anamorphic lens",
        icon: "Film",
    },
    {
        id: "vintage",
        name: "Vintage",
        prompt: "vintage photography, retro aesthetic, faded colors, nostalgic, film grain, 1970s style",
        icon: "Archive",
    },
    {
        id: "3d-render",
        name: "3D Render",
        prompt: "3D render, octane render, unreal engine, highly detailed, ray tracing, professional CGI",
        icon: "Box",
    },
    {
        id: "minimalist",
        name: "Minimalist",
        prompt: "minimalist design, clean composition, simple shapes, negative space, modern aesthetic",
        icon: "Minus",
    },
];
