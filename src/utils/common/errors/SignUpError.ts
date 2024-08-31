import CustomError from "@/utils/common/errors/CustomError";

class SignUpError extends CustomError {
  constructor(message: string) {
    super(`회원가입에 실패하였습니다. 다시 시도해주세요. 이유: ${message}`);
    this.name = "SignUpError";
  }
}

export default SignUpError;
