// 스토리지 타입을 명시하기 위한 enum
export enum StorageType {
  LOCAL = "localStorage",
  SESSION = "sessionStorage",
}

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

// 스토리지에 값을 저장하는 함수
export function setUserEmail(
  email: string,
  storageType: StorageType = StorageType.LOCAL
) {
  if (typeof window !== "undefined") {
    const storage = window[storageType];
    storage.setItem("email", email);
  }
}

// 스토리지에서 값을 가져오는 함수
export function getUserEmail(storageType: StorageType = StorageType.LOCAL) {
  if (typeof window !== "undefined") {
    const storage = window[storageType];
    return storage.getItem("email");
  }
  return null;
}
