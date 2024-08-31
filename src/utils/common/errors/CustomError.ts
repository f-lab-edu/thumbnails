class CustomError extends Error {
  constructor(message: string) {
    super(message); // 부모 클래스(Error)의 생성자를 호출합니다.
    this.name = this.constructor.name; // Error의 이름을 CustomError로 설정합니다.
    Error.captureStackTrace(this, this.constructor); // 스택 트레이스에서 현재 클래스의 생성자 호출을 제거합니다.
  }
}

export default CustomError;
