import { getDB } from "./schema";
import { GeneratedImage } from "../types/models";

// Save a generated image to IndexedDB
export async function saveGeneration(
    image: GeneratedImage
): Promise<string> {
    const db = await getDB();
    const id = `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const imageWithId = { ...image, id };
    await db.add("generations", imageWithId);
    return id;
}

// Get all generations with optional filtering and sorting
export async function getGenerations(options?: {
    modelId?: string;
    limit?: number;
    offset?: number;
    sortBy?: "timestamp" | "model";
    sortOrder?: "asc" | "desc";
}): Promise<Array<GeneratedImage & { id: string }>> {
    const db = await getDB();
    const {
        modelId,
        limit = 50,
        offset = 0,
        sortBy = "timestamp",
        sortOrder = "desc",
    } = options || {};

    let items: Array<GeneratedImage & { id: string }>;

    if (modelId) {
        items = await db.getAllFromIndex("generations", "by-model", modelId);
    } else {
        items = await db.getAll("generations");
    }

    // Sort
    if (sortBy === "timestamp") {
        items.sort((a, b) =>
            sortOrder === "desc" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp
        );
    }

    // Pagination
    return items.slice(offset, offset + limit);
}

// Search generations by prompt text
export async function searchGenerations(
    query: string
): Promise<Array<GeneratedImage & { id: string }>> {
    const db = await getDB();
    const all = await db.getAll("generations");
    const lowerQuery = query.toLowerCase();

    return all.filter((item) =>
        item.prompt.toLowerCase().includes(lowerQuery)
    );
}

// Delete a generation
export async function deleteGeneration(id: string): Promise<void> {
    const db = await getDB();
    await db.delete("generations", id);
}

// Get a single generation by ID
export async function getGeneration(
    id: string
): Promise<(GeneratedImage & { id: string }) | undefined> {
    const db = await getDB();
    return await db.get("generations", id);
}

// Favorites operations
export async function addToFavorites(id: string): Promise<void> {
    const db = await getDB();
    await db.put("favorites", { id, timestamp: Date.now() });
}

export async function removeFromFavorites(id: string): Promise<void> {
    const db = await getDB();
    await db.delete("favorites", id);
}

export async function isFavorite(id: string): Promise<boolean> {
    const db = await getDB();
    const fav = await db.get("favorites", id);
    return !!fav;
}

export async function getFavorites(): Promise<string[]> {
    const db = await getDB();
    const favs = await db.getAll("favorites");
    return favs.map((f) => f.id);
}

// Storage usage calculation
export async function getStorageUsage(): Promise<{
    used: number;
    total: number;
    percentage: number;
}> {
    if (navigator.storage && navigator.storage.estimate) {
        const estimate = await navigator.storage.estimate();
        const used = estimate.usage || 0;
        const total = estimate.quota || 0;
        const percentage = total > 0 ? (used / total) * 100 : 0;
        return { used, total, percentage };
    }
    return { used: 0, total: 0, percentage: 0 };
}

// Export all data as JSON
export async function exportData(): Promise<string> {
    const db = await getDB();
    const generations = await db.getAll("generations");
    const favorites = await db.getAll("favorites");
    const collections = await db.getAll("collections");

    const data = {
        version: 1,
        exportDate: new Date().toISOString(),
        generations,
        favorites,
        collections,
    };

    return JSON.stringify(data, null, 2);
}

// Import data from JSON
export async function importData(jsonData: string): Promise<void> {
    const db = await getDB();
    const data = JSON.parse(jsonData);

    // Import generations
    if (data.generations) {
        for (const gen of data.generations) {
            await db.put("generations", gen);
        }
    }

    // Import favorites
    if (data.favorites) {
        for (const fav of data.favorites) {
            await db.put("favorites", fav);
        }
    }

    // Import collections
    if (data.collections) {
        for (const col of data.collections) {
            await db.put("collections", col);
        }
    }
}

// Clear all data
export async function clearAllData(): Promise<void> {
    const db = await getDB();
    await db.clear("generations");
    await db.clear("favorites");
    await db.clear("collections");
}
