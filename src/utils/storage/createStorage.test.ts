import createStorage from "@/utils/storage/createStorage";
import { StorageType } from "@/types/utils";
import { serializeData, deserializeData } from "@/utils/storage/index";

// 모의 데이터 직렬화 함수 모킹
jest.mock("@/utils/storage", () => ({
  serializeData: jest.fn((value) => JSON.stringify(value)),
  deserializeData: jest.fn((value) => (value ? JSON.parse(value) : null)),
}));

// localStorage 및 sessionStorage를 모킹
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

const mockSessionStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

describe("createStorage", () => {
  beforeAll(() => {
    // 브라우저 환경 모킹
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });
    Object.defineProperty(window, "sessionStorage", {
      value: mockSessionStorage,
    });
  });

  afterEach(() => {
    // 각 테스트 후 스토리지 비우기
    mockLocalStorage.clear();
    mockSessionStorage.clear();
  });

  it("localStorage를 사용하여 데이터를 설정, 가져오기, 삭제하기", () => {
    const storage = createStorage(StorageType.LOCAL);
    const storageItem = storage.create("testKey");

    storageItem.set({ test: "value" });
    expect(localStorage.getItem("testKey")).toBe(
      serializeData({ test: "value" })
    );

    const retrievedValue = storageItem.get();
    expect(retrievedValue).toEqual({ test: "value" });

    storageItem.delete();
    expect(localStorage.getItem("testKey")).toBeNull();
  });

  it("sessionStorage를 사용하여 데이터를 설정, 가져오기, 삭제하기", () => {
    const storage = createStorage(StorageType.SESSION);
    const storageItem = storage.create("testKey");

    storageItem.set({ test: "value" });
    expect(sessionStorage.getItem("testKey")).toBe(
      serializeData({ test: "value" })
    );

    const retrievedValue = storageItem.get();
    expect(retrievedValue).toEqual({ test: "value" });

    storageItem.delete();
    expect(sessionStorage.getItem("testKey")).toBeNull();
  });

  it("브라우저 환경이 아닌 경우 더미 스토리지를 반환해야 한다", () => {
    Object.defineProperty(global, "window", {
      value: undefined,
      writable: true,
    });
    const storage = createStorage(StorageType.LOCAL);
    const storageItem = storage.create("testKey");

    storageItem.set({ test: "value" }); // 실제로는 작업을 수행하지 않음
    expect(storageItem.get()).toBeNull(); // 더미 스토리지에서 항상 null 반환
  });
});
