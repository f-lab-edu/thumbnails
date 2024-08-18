import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import LoginPage from "@/components/LoginPage";
import { useRouter } from "next/router";
import { createClient } from "@/utils/supabase/component";
import { toast } from "react-toastify";

// 필요한 모듈 모킹
vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/utils/supabase/component", () => ({
  createClient: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  ToastContainer: vi.fn(),
  toast: {
    error: vi.fn(),
  },
}));

describe("LoginPage", () => {
  const email = "test@example.com";
  const secret = "abc1234";
  const push = vi.fn();
  const replace = vi.fn();
  const signInWithPassword = vi.fn();
  const signUp = vi.fn();

  beforeEach(() => {
    // useRouter 훅 모킹
    (useRouter as any).mockReturnValue({ push, replace });

    // supabase 클라이언트 메서드 모킹
    (createClient as any).mockReturnValue({
      auth: {
        signInWithPassword,
        signUp,
      },
    });

    // 모킹 초기화
    push.mockClear();
    replace.mockClear();
    signInWithPassword.mockClear();
    signUp.mockClear();
  });

  const fillAndSubmitForm = async (
    buttonName: RegExp,
    emailValue = email,
    passwordValue = secret
  ) => {
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: emailValue },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: passwordValue },
    });
    fireEvent.click(screen.getByRole("button", { name: buttonName }));
  };

  it("로그인 페이지가 렌더링된다", () => {
    render(<LoginPage />);

    expect(screen.getByLabelText(/email/i)).toBeDefined();
    expect(screen.getByLabelText(/password/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /log in/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeDefined();
  });

  it("폼이 제출되고 로그인이 성공적으로 이루어진다", async () => {
    signInWithPassword.mockResolvedValueOnce({ error: null });

    render(<LoginPage />);

    await fillAndSubmitForm(/log in/i);

    await waitFor(() => {
      expect(signInWithPassword).toHaveBeenCalledWith({
        email,
        password: secret,
      });
    });

    expect(replace).toHaveBeenCalledWith("/games");
  });

  it("로그인 실패 시 에러 토스트가 표시된다", async () => {
    signInWithPassword.mockResolvedValueOnce({
      error: { message: "Login failed" },
    });

    render(<LoginPage />);

    await fillAndSubmitForm(/log in/i);

    await waitFor(() => {
      expect(signInWithPassword).toHaveBeenCalledWith({
        email,
        password: secret,
      });
    });

    expect(toast.error).toHaveBeenCalledWith(
      "로그인에 실패하였습니다. 다시 시도해주세요. 이유: Login failed"
    );

    expect(replace).not.toHaveBeenCalled();
  });

  it("폼이 제출되고 회원가입이 성공적으로 이루어진다", async () => {
    signUp.mockResolvedValueOnce({ error: null });

    render(<LoginPage />);

    await fillAndSubmitForm(/sign up/i);

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith({
        email,
        password: secret,
      });
    });

    expect(push).toHaveBeenCalledWith("/games");
  });

  it("폼이 유효하지 않으면 유효성 검사 에러가 표시된다", async () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findAllByRole("alert")).toHaveLength(2);

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findAllByRole("alert")).toHaveLength(2);
  });
});
