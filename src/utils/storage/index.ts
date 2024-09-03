import createStorage from "@/utils/storage/createStorage";

export function serializeData<T>(value: T): string {
  return JSON.stringify(value);
}

export function deserializeData<T>(data: string | null): T | null {
  return data ? JSON.parse(data) : null;
}

const storage = createStorage();

export const userStorage = storage.create("user");
