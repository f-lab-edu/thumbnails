import {
  StorageType,
  StorageObject,
  StorageItem,
  StorageValueType,
} from "@/types/utils";
import { serializeData, deserializeData } from "@/utils/storage";

/**
 * 브라우저 환경이 아닌 경우 사용할 더미 스토리지 객체입니다.
 * Web Storage API(localStorage/sessionStorage)의 인터페이스를 모방합니다.
 */
const dummyStorage: StorageObject = {
  create: function (key: string): StorageItem {
    return {
      set: function (value: any) {
        // 작업 없음 (noop)
      },
      get: function () {
        return null; // 데이터가 없음을 모방
      },
      delete: function () {
        // 작업 없음 (noop)
      },
    };
  },
};

/**
 * 주어진 스토리지 타입에 따라 localStorage 또는 sessionStorage 객체를 생성합니다.
 * 브라우저 환경이 아닌 경우 더미 스토리지 객체를 반환합니다.
 *
 * @param type - 스토리지 타입: localStorage 또는 sessionStorage (기본값: localStorage)
 * @returns 스토리지 객체
 */
function createStorage<T extends StorageValueType>(
  type: StorageType = StorageType.LOCAL
): StorageObject {
  if (typeof window === "undefined") {
    return dummyStorage; // return dummy object for not browser environment
  }
  const storage = type === StorageType.LOCAL ? localStorage : sessionStorage;
  return {
    create: function (key: string) {
      return {
        set: function (value: T) {
          storage.setItem(key, serializeData(value));
        },
        get: function (): T | null {
          return deserializeData(storage.getItem(key));
        },
        delete: function () {
          storage.removeItem(key);
        },
      };
    },
  };
}

export default createStorage;
