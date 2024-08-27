import { StorageType } from "@/types/utils";
export function createStorage(type: StorageType = StorageType.LOCAL) {
  if (typeof window === "undefined") {
    return;
  }
  const storage = type === StorageType.LOCAL ? localStorage : sessionStorage;
  return {
    create: function (key: string) {
      return {
        set: function (value: string) {
          storage.setItem(key, value);
        },
        get: function () {
          return storage.getItem(key);
        },
        delete: function () {
          storage.removeItem(key);
        },
      };
    },
  };
}
