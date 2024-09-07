import { authenticateUser, requestToSignIn, requestToSignUp } from "./auth";
import { userStorage } from "@/storages";
import CustomError from "@/utils/common/errors/CustomError";
import { createClient } from "@/utils/supabase/component";
import { UserResponse, AuthError } from "@supabase/supabase-js";

const USER_DUMMY = {
  id: "user-id",
  aud: "authenticated",
  email: "user@example.com",
  app_metadata: {
    provider: "email",
    providers: ["email"],
  },
  user_metadata: {
    email: "user@example.com",
    email_verified: false,
    phone_verified: false,
    sub: "ba1acab4-e453-4b0d-9cb5-5688fbc24f48",
  },
  created_at: "2024-08-22T12:53:48.028702Z",
};

const SESSION_DUMMY = {
  access_token: "test",
  refresh_token: "test",
  expires_in: 3,
  token_type: "test",
  user: USER_DUMMY,
};

jest.mock("@/utils/supabase/component", () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn(),
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
    },
  })),
}));

jest.mock("@/utils/storage/index", () => ({
  userStorage: {
    set: jest.fn(),
    get: jest.fn(() => USER_DUMMY),
  },
}));

describe("Supabase Authentication", () => {
  const supabase = createClient();

  describe("authenticateUser", () => {
    it("유저 정보를 성공적으로 반환해야 한다", async () => {
      const getUserResponse: UserResponse = {
        data: {
          user: USER_DUMMY,
        },
        error: null,
      };
      jest.spyOn(supabase.auth, "getUser").mockResolvedValue(getUserResponse);

      const result = await authenticateUser();

      expect(userStorage.set).toHaveBeenCalledWith({
        id: "user-id",
        email: "user@example.com",
      });
      expect(result).toEqual({ id: "user-id", email: "user@example.com" });
    });

    it("인증 서버 에러 발생 시 CustomError를 던져야 한다", async () => {
      jest
        .spyOn(supabase.auth, "getUser")
        .mockRejectedValue(new Error("Server Error"));

      await expect(authenticateUser()).rejects.toThrow(CustomError);
    });
  });

  describe("requestToSignIn", () => {
    it("로그인 요청을 성공적으로 처리해야 한다", async () => {
      const mockResponse = {
        data: {
          user: USER_DUMMY,
          session: SESSION_DUMMY,
        },
        error: null,
      };
      jest
        .spyOn(supabase.auth, "signInWithPassword")
        .mockResolvedValue(mockResponse);

      const result = await requestToSignIn("test@example.com", "password");

      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
      expect(userStorage.set).toHaveBeenCalledWith(mockResponse.data.user);
      expect(result).toEqual(mockResponse.data.user);
    });

    it("로그인 에러 시 CustomError를 던져야 한다", async () => {
      jest
        .spyOn(supabase.auth, "signInWithPassword")
        .mockRejectedValue(new CustomError("Login Error"));

      await expect(
        requestToSignIn("test@example.com", "wrongpassword")
      ).rejects.toThrow(CustomError);
    });
  });

  describe("requestToSignUp", () => {
    it("회원가입 요청을 성공적으로 처리해야 한다", async () => {
      const mockResponse = {
        data: { user: USER_DUMMY, session: SESSION_DUMMY },
        error: null,
      };
      jest.spyOn(supabase.auth, "signUp").mockResolvedValue(mockResponse);

      const result = await requestToSignUp("test@example.com", "password");

      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
      expect(userStorage.set).toHaveBeenCalledWith(mockResponse.data.user);
      expect(result).toEqual(mockResponse.data.user);
    });

    it("회원가입 에러 시 CustomError를 던져야 한다", async () => {
      jest
        .spyOn(supabase.auth, "signUp")
        .mockRejectedValue(new CustomError("SignUp Error"));

      await expect(
        requestToSignUp("test@example.com", "password")
      ).rejects.toThrow(CustomError);
    });
  });
});
