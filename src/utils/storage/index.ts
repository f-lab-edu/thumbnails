import createStorage from "@/utils/storage/createStorage";
import { StorageValueType } from "@/types/utils";

export function serializeForStorage<T>(value: T): string {
  switch (true) {
    case typeof value === "function":
      return `__function:${value.toString()}`;
    case value instanceof Date:
      return `__date:${value.toISOString()}`;
    case value instanceof RegExp:
      return `__regexp:${value.toString()}`;
    case value instanceof Set:
      return `__set:${JSON.stringify([...value])}`;
    case value instanceof Map:
      return `__map:${JSON.stringify([...value])}`;
    case typeof value === "object" && value !== null:
      return JSON.stringify(value);
    case typeof value === "string":
      return value;
    default:
      return JSON.stringify(value);
  }
}

export function deserializeFromStorage<T extends StorageValueType>(
  value: string
): T {
  if (typeof value === "string") {
    switch (true) {
      case value.startsWith("__function:"):
        const funcBody = value.slice(11);
        return new Function(`return ${funcBody}`)();
      case value.startsWith("__date:"):
        return new Date(value.slice(7)) as T;
      case value.startsWith("__regexp:"):
        const parts = value.slice(9).match(/\/(.*?)\/([gimsuy]*)$/);
        return new RegExp(parts![1], parts![2]) as T;
      case value.startsWith("__set:"):
        const arrSet = JSON.parse(value.slice(6));
        return new Set(arrSet) as T;
      case value.startsWith("__map:"):
        const arrMap = JSON.parse(value.slice(6));
        return new Map(arrMap) as T;
      default:
        try {
          return JSON.parse(value, (_key, val) => deserializeFromStorage(val));
        } catch (e) {
          return value as T;
        }
    }
  } else {
    return value;
  }
}

const storage = createStorage();

export const userStorage = storage.create("user");
