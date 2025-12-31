// Model types and interfaces
export interface ModelConfig {
    id: string;
    name: string;
    endpoint: string;
    provider: string;
    description: string;
    capabilities: string[];
    supportedSizes: ImageSizeOption[];
    parameters: ModelParameters;
}

export interface ImageSizeOption {
    id: string;
    label: string;
    value: string | { width: number; height: number };
    aspectRatio: string;
    width?: number;
    height?: number;
}

export interface ModelParameters {
    supportsGuidanceScale?: boolean;
    supportsInferenceSteps?: boolean;
    supportsSeed?: boolean;
    supportsNegativePrompt?: boolean;
    supportsNumImages?: boolean;
    supportsPromptOptimizer?: boolean;
    supportsPromptExpansion?: boolean;
    supportsLoRA?: boolean;
    defaultGuidanceScale?: number;
    defaultInferenceSteps?: number;
    minInferenceSteps?: number;
    maxInferenceSteps?: number;
    maxNumImages?: number;
}

export interface GenerationRequest {
    modelId: string;
    prompt: string;
    imageSize: string | { width: number; height: number };
    guidanceScale?: number;
    inferenceSteps?: number;
    seed?: number;
    negativePrompt?: string;
    numImages?: number;
    promptOptimizer?: boolean;
    enablePromptExpansion?: boolean;
}

export interface GenerationResult {
    requestId: string;
    modelId: string;
    prompt: string;
    images: GeneratedImage[];
    seed: number;
    timestamp: number;
    parameters: GenerationRequest;
}

export interface GeneratedImage {
    url: string;
    width: number;
    height: number;
    contentType: string;
    modelId: string;
    prompt: string;
    seed: number;
    timestamp: number;
}

export interface QueueStatus {
    status: "IN_QUEUE" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
    logs?: Array<{ message: string }>;
    progress?: number;
    estimatedTime?: number;
}

export type StylePreset = {
    id: string;
    name: string;
    prompt: string;
    icon: string;
};
