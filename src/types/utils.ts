// 스토리지 타입을 명시하기 위한 enum
export enum StorageType {
  LOCAL = "localStorage",
  SESSION = "sessionStorage",
}

export interface StorageItem {
  get: () => any;
  set: (value: any) => void;
  delete: (key: string) => void;
}
export interface StorageObject {
  create: (key: string) => StorageItem;
}
