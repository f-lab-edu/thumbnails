import { render, screen } from "@testing-library/react";
import LoginStatus from "./";
import { useAuthenticate } from "@/queries/auth";
import { Suspense, ReactNode } from "react";

// useAuthenticate 훅을 mock 처리
jest.mock("@/queries/auth");
jest.mock("@/utils/supabase/component", () => {
  return {
    createClient: jest.fn(() => ({
      auth: {
        getSession: jest.fn(() => Promise.resolve({ data: { session: null } })),
        signInWithPassword: jest.fn(),
        signOut: jest.fn(),
      },
    })),
  };
});

describe("LoginStatus 컴포넌트", () => {
  // useAuthenticate를 Mock으로 변환
  const mockedUseAuthenticate = useAuthenticate as jest.Mock;

  function renderWithSuspense(ui: ReactNode) {
    return render(<Suspense fallback={<span>Loading...</span>}>{ui}</Suspense>);
  }

  it("인증된 사용자의 이메일을 표시한다", () => {
    // 인증된 사용자의 이메일을 반환하도록 mock 설정
    mockedUseAuthenticate.mockReturnValue({
      data: { email: "test@example.com" },
    });

    renderWithSuspense(<LoginStatus />);

    // 이메일이 표시되는지 확인
    const emailElement = screen.getByText("test@example.com");
    expect(emailElement).toBeInTheDocument();
  });

  it("'Login' 링크를 인증되지 않은 사용자에게 표시한다", () => {
    // 인증되지 않은 상태를 mock 설정
    mockedUseAuthenticate.mockReturnValue({
      data: null,
    });

    renderWithSuspense(<LoginStatus />);

    // "Login" 텍스트가 있는 링크가 표시되는지 확인
    const loginElement = screen.getByText("Login");
    expect(loginElement).toBeInTheDocument();
  });

  it("데이터를 불러오는 동안 로딩 상태를 표시한다", () => {
    // 아무 데이터도 없이 Suspense에 진입하여 로딩 상태를 확인
    mockedUseAuthenticate.mockReturnValue({
      data: undefined,
    });

    renderWithSuspense(<LoginStatus />);

    // 로딩 상태가 표시되는지 확인
    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  });
});
