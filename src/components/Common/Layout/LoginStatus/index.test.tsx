import { render, screen } from "@testing-library/react";
import LoginStatus from "@/components/Common/Layout/LoginStatus";
import { useAuthenticate } from "@/queries/auth";
import { BrowserRouter as Router } from "react-router-dom"; // Link 컴포넌트를 위한 라우터
import "@testing-library/jest-dom"; // toBeInTheDocument를 사용하기 위해 추가

// useAuthenticate 모의(mock) 구현
jest.mock("@/queries/auth");

describe("LoginStatus 컴포넌트", () => {
  it("로그인하지 않은 경우 'Login' 텍스트가 렌더링되어야 한다", () => {
    // useAuthenticate에서 반환값을 mock 처리
    (useAuthenticate as jest.Mock).mockReturnValue({ data: null });

    // 컴포넌트를 렌더링할 때, Router로 감싸서 Link 컴포넌트가 제대로 작동하도록 합니다.
    render(
      <Router>
        <LoginStatus />
      </Router>
    );

    // 'Login' 텍스트가 화면에 나타나는지 확인
    const loginText = screen.getByText("Login");
    expect(loginText).toBeInTheDocument();
  });

  it("로그인한 경우 사용자 이메일이 렌더링되어야 한다", () => {
    // useAuthenticate에서 로그인된 사용자 데이터를 mock 처리
    (useAuthenticate as jest.Mock).mockReturnValue({
      data: { email: "test@example.com" },
    });

    render(
      <Router>
        <LoginStatus />
      </Router>
    );

    // 이메일 텍스트가 화면에 나타나는지 확인
    const emailText = screen.getByText("test@example.com");
    expect(emailText).toBeInTheDocument();
  });
});
