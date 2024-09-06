import { serializeData, deserializeData } from "@/utils/storage";

// Jest에서 createStorage를 모킹(mocking)
jest.mock("@/utils/storage/createStorage");

describe("serializeData", () => {
  it("객체를 JSON 문자열로 직렬화해야 한다", () => {
    const obj = { name: "John", age: 30 };
    const serialized = serializeData(obj);
    expect(serialized).toBe(JSON.stringify(obj));
  });

  it("원시 값을 직렬화해야 한다", () => {
    const number = 123;
    const serialized = serializeData(number);
    expect(serialized).toBe(JSON.stringify(number));
  });
});

describe("deserializeData", () => {
  it("JSON 문자열을 객체로 역직렬화해야 한다", () => {
    const jsonString = '{"name": "John", "age": 30}';
    const deserialized = deserializeData(jsonString);
    expect(deserialized).toEqual({ name: "John", age: 30 });
  });

  it("입력이 null일 경우 null을 반환해야 한다", () => {
    const deserialized = deserializeData(null);
    expect(deserialized).toBeNull();
  });

  it("JSON 문자열을 원시 값으로 역직렬화해야 한다", () => {
    const jsonString = "123";
    const deserialized = deserializeData(jsonString);
    expect(deserialized).toBe(123);
  });
});
