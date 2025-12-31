import { openDB, DBSchema, IDBPDatabase } from "idb";
import { GeneratedImage } from "../types/models";

interface ImageStudioDB extends DBSchema {
    generations: {
        key: string;
        value: GeneratedImage & { id: string };
        indexes: {
            "by-timestamp": number;
            "by-model": string;
            "by-prompt": string;
        };
    };
    favorites: {
        key: string;
        value: { id: string; timestamp: number };
    };
    collections: {
        key: string;
        value: { id: string; name: string; imageIds: string[]; timestamp: number };
    };
}

const DB_NAME = "ai-image-studio";
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<ImageStudioDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<ImageStudioDB>> {
    if (dbInstance) {
        return dbInstance;
    }

    dbInstance = await openDB<ImageStudioDB>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            // Generations store
            if (!db.objectStoreNames.contains("generations")) {
                const generationStore = db.createObjectStore("generations", {
                    keyPath: "id",
                });
                generationStore.createIndex("by-timestamp", "timestamp");
                generationStore.createIndex("by-model", "modelId");
                generationStore.createIndex("by-prompt", "prompt");
            }

            // Favorites store
            if (!db.objectStoreNames.contains("favorites")) {
                db.createObjectStore("favorites", { keyPath: "id" });
            }

            // Collections store
            if (!db.objectStoreNames.contains("collections")) {
                db.createObjectStore("collections", { keyPath: "id" });
            }
        },
    });

    return dbInstance;
}
