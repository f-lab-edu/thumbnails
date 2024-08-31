import CustomError from "@/utils/common/errors/CustomError";

class LoginError extends CustomError {
  constructor(message: string) {
    super(`로그인에 실패하였습니다. 다시 시도해주세요. 이유: ${message}`);
    this.name = "LoginError";
  }
}

export default LoginError;
