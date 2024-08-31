import createStorage from "@/utils/storage/createStorage";
import { StorageType } from "@/types/utils";
import { serializeForStorage, deserializeFromStorage } from "@/utils/storage";

// // // 스토리지 유틸리티 함수들을 모킹(mocking)합니다
// jest.mock("@/utils/storage", () => ({
//   serializeForStorage: jest.fn((value) => JSON.stringify(value)),
//   deserializeFromStorage: jest.fn((key) => JSON.parse(key)),
// }));

describe("createStorage", () => {
  // localStorage와 sessionStorage를 모킹합니다
  let localStorageMock;
  let sessionStorageMock;

  beforeEach(() => {
    // 각 테스트 전 모든 모킹된 함수들을 초기화합니다
    jest.clearAllMocks();

    // localStorage 모킹
    localStorageMock = (() => {
      let store = {};
      return {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
        key: jest.fn(),
        get length() {
          return Object.keys(store).length;
        },
      };
    })();

    // sessionStorage 모킹
    sessionStorageMock = (() => {
      let store = {};
      return {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
        key: jest.fn(),
        get length() {
          return Object.keys(store).length;
        },
      };
    })();

    // 글로벌 변수에 모킹된 객체를 할당합니다
    Object.defineProperty(global, "localStorage", {
      value: localStorageMock,
      writable: true,
    });

    Object.defineProperty(global, "sessionStorage", {
      value: sessionStorageMock,
      writable: true,
    });
  });

  describe("브라우저 환경에서", () => {
    it("StorageType.LOCAL이 전달되면 localStorage 객체를 생성해야 합니다", () => {
      const storage = createStorage(StorageType.LOCAL);
      const item = storage.create("testKey");

      item.set({ some: "value" });

      expect(global.localStorage.setItem).toHaveBeenCalledWith(
        "testKey",
        JSON.stringify({ some: "value" })
      );
    });

    it("StorageType.SESSION이 전달되면 sessionStorage 객체를 생성해야 합니다", () => {
      const storage = createStorage(StorageType.SESSION);
      const item = storage.create("testKey");

      item.set({ some: "value" });

      expect(global.sessionStorage.setItem).toHaveBeenCalledWith(
        "testKey",
        JSON.stringify({ some: "value" })
      );
    });

    it("localStorage에서 아이템을 가져와야 합니다", () => {
      (global.localStorage.getItem as jest.Mock).mockReturnValue(
        JSON.stringify({ some: "value" })
      );

      const storage = createStorage(StorageType.LOCAL);
      const item = storage.create("testKey");
      const value = item.get();

      expect(global.localStorage.getItem).toHaveBeenCalledWith("testKey");
      expect(value).toEqual({ some: "value" });
    });

    it("localStorage에서 아이템을 삭제해야 합니다", () => {
      const storage = createStorage(StorageType.LOCAL);
      const item = storage.create("testKey");

      item.delete();

      expect(global.localStorage.removeItem).toHaveBeenCalledWith("testKey");
    });

    it("localStorage의 길이를 올바르게 반환해야 합니다", () => {
      const storage = createStorage(StorageType.LOCAL);
      const item1 = storage.create("key1");
      const item2 = storage.create("key2");

      item1.set("value1");
      item2.set("value2");

      expect(global.localStorage.length).toBe(2);
    });

    it("주어진 인덱스의 키를 올바르게 반환해야 합니다", () => {
      const storage = createStorage(StorageType.LOCAL);
      const item1 = storage.create("key1");
      const item2 = storage.create("key2");

      item1.set("value1");
      item2.set("value2");

      expect(global.localStorage.key(0)).toBe("key1");
      expect(global.localStorage.key(1)).toBe("key2");
    });
  });

  describe("브라우저 환경이 아닐 때", () => {
    beforeEach(() => {
      delete global.window;
    });

    it("dummyStorage 객체를 반환해야 합니다", () => {
      const storage = createStorage(StorageType.LOCAL);
      const item = storage.create("testKey");

      expect(item.set("value")).toBeUndefined();
      expect(item.get()).toBeNull();
      expect(item.delete()).toBeUndefined();
    });
  });
});
