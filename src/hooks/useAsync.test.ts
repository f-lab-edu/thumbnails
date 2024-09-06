import { renderHook, act } from "@testing-library/react";
import { toast } from "react-toastify";
import useAsync from "@/hooks/useAsync"; // useAsync 훅을 불러옴

// toast 메시지를 모의(mock) 처리
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("useAsync 훅 테스트", () => {
  const successMessage = "성공적으로 실행되었습니다";
  const errorMessage = "실행 중 오류가 발생했습니다";

  beforeEach(() => {
    jest.clearAllMocks(); // 각 테스트 전에 mock 상태를 초기화
  });

  it("비동기 작업이 성공할 때 loading 상태, 데이터, 성공 메시지를 설정해야 한다", async () => {
    const mockAsyncFunction = jest.fn().mockResolvedValue("data");

    const { result } = renderHook(() =>
      useAsync(mockAsyncFunction, successMessage)
    );

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);

    await act(async () => {
      result.current.execute();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe("data");
    expect(toast.success).toHaveBeenCalledWith(successMessage);
  });

  it("비동기 작업이 실패할 때 loading 상태와 에러 메시지를 설정해야 한다", async () => {
    const mockError = new Error("네트워크 오류");
    const mockAsyncFunction = jest.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() =>
      useAsync(mockAsyncFunction, successMessage, errorMessage)
    );

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);

    await act(async () => {
      result.current.execute();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(mockError.message);
    expect(toast.error).toHaveBeenCalledWith(mockError.message);
  });

  it("비동기 작업을 실행할 때 loading 상태가 true로 설정되고, 이후 false로 설정된다", async () => {
    const mockAsyncFunction = jest.fn().mockResolvedValue("data");

    const { result } = renderHook(() =>
      useAsync(mockAsyncFunction, successMessage)
    );

    expect(result.current.loading).toBe(false);

    act(() => {
      result.current.execute();
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await result.current.execute();
    });

    expect(result.current.loading).toBe(false);
  });
});
