import { ModelConfig, ImageSizeOption } from "../types/models";

// Image size options
const FLUX_SIZES: ImageSizeOption[] = [
    { id: "square_hd", label: "Square HD", value: "square_hd", aspectRatio: "1:1", width: 1024, height: 1024 },
    { id: "square", label: "Square", value: "square", aspectRatio: "1:1", width: 512, height: 512 },
    { id: "portrait_4_3", label: "Portrait 4:3", value: "portrait_4_3", aspectRatio: "3:4", width: 768, height: 1024 },
    { id: "portrait_16_9", label: "Portrait 16:9", value: "portrait_16_9", aspectRatio: "9:16", width: 576, height: 1024 },
    { id: "landscape_4_3", label: "Landscape 4:3", value: "landscape_4_3", aspectRatio: "4:3", width: 1024, height: 768 },
    { id: "landscape_16_9", label: "Landscape 16:9", value: "landscape_16_9", aspectRatio: "16:9", width: 1024, height: 576 },
];

const MINIMAX_SIZES: ImageSizeOption[] = [
    { id: "1:1", label: "Square 1:1", value: "1:1", aspectRatio: "1:1", width: 1024, height: 1024 },
    { id: "16:9", label: "Landscape 16:9", value: "16:9", aspectRatio: "16:9", width: 1024, height: 576 },
    { id: "4:3", label: "Landscape 4:3", value: "4:3", aspectRatio: "4:3", width: 1024, height: 768 },
    { id: "3:2", label: "Landscape 3:2", value: "3:2", aspectRatio: "3:2", width: 1024, height: 683 },
    { id: "2:3", label: "Portrait 2:3", value: "2:3", aspectRatio: "2:3", width: 683, height: 1024 },
    { id: "3:4", label: "Portrait 3:4", value: "3:4", aspectRatio: "3:4", width: 768, height: 1024 },
    { id: "9:16", label: "Portrait 9:16", value: "9:16", aspectRatio: "9:16", width: 576, height: 1024 },
    { id: "21:9", label: "Ultrawide 21:9", value: "21:9", aspectRatio: "21:9", width: 1024, height: 439 },
];

const ZIMAGE_SIZES: ImageSizeOption[] = [...FLUX_SIZES];

// Model configurations based on API documentation
export const MODELS: ModelConfig[] = [
    {
        id: "flux-schnell",
        name: "FLUX.1 [schnell]",
        endpoint: "fal-ai/flux/schnell",
        provider: "Black Forest Labs",
        description: "12B parameter flow transformer for high-quality images in 1-4 steps. Fast and suitable for commercial use.",
        capabilities: ["Text-to-Image", "Fast Generation", "Commercial Use"],
        supportedSizes: FLUX_SIZES,
        parameters: {
            supportsGuidanceScale: true,
            supportsInferenceSteps: true,
            supportsSeed: true,
            supportsNumImages: true,
            supportsNegativePrompt: false,
            supportsPromptOptimizer: false,
            supportsPromptExpansion: false,
            supportsLoRA: false,
            defaultGuidanceScale: 3.5,
            defaultInferenceSteps: 4,
            minInferenceSteps: 1,
            maxInferenceSteps: 8,
            maxNumImages: 4,
        },
    },
    {
        id: "minimax-image-01",
        name: "MiniMax Image-01",
        endpoint: "fal-ai/minimax/image-01",
        provider: "Hailuo AI",
        description: "High-quality image generation optimized for longer text prompts. Partner model with excellent detail.",
        capabilities: ["Text-to-Image", "Prompt Optimization", "Commercial Use"],
        supportedSizes: MINIMAX_SIZES,
        parameters: {
            supportsGuidanceScale: false,
            supportsInferenceSteps: false,
            supportsSeed: false,
            supportsNumImages: true,
            supportsNegativePrompt: false,
            supportsPromptOptimizer: true,
            supportsPromptExpansion: false,
            supportsLoRA: false,
            maxNumImages: 9,
        },
    },
    {
        id: "zimage-turbo",
        name: "Z-Image Turbo",
        endpoint: "fal-ai/z-image/turbo/lora",
        provider: "Tongyi-MAI",
        description: "Super fast 6B parameter model with LoRA support for customization. Lightning-fast generation.",
        capabilities: ["Text-to-Image", "LoRA Support", "Fast Generation", "Commercial Use"],
        supportedSizes: ZIMAGE_SIZES,
        parameters: {
            supportsGuidanceScale: false,
            supportsInferenceSteps: true,
            supportsSeed: true,
            supportsNumImages: true,
            supportsNegativePrompt: false,
            supportsPromptOptimizer: false,
            supportsPromptExpansion: true,
            supportsLoRA: true,
            defaultInferenceSteps: 8,
            minInferenceSteps: 1,
            maxInferenceSteps: 20,
            maxNumImages: 4,
        },
    },
];

// Helper to get common sizes between selected models
export function getCommonSizes(modelIds: string[]): ImageSizeOption[] {
    if (modelIds.length === 0) return [];
    if (modelIds.length === 1) {
        const model = MODELS.find((m) => m.id === modelIds[0]);
        return model?.supportedSizes || [];
    }

    // Find intersection of supported sizes across all selected models
    const selectedModels = MODELS.filter((m) => modelIds.includes(m.id));
    const commonSizes = selectedModels[0].supportedSizes.filter((size) =>
        selectedModels.every((model) =>
            model.supportedSizes.some((s) => s.aspectRatio === size.aspectRatio)
        )
    );

    return commonSizes;
}

// Helper to check if any selected model supports a parameter
export function supportsParameter(
    modelIds: string[],
    parameter: keyof ModelConfig["parameters"]
): boolean {
    const selectedModels = MODELS.filter((m) => modelIds.includes(m.id));
    return selectedModels.some((model) => model.parameters[parameter] === true);
}
