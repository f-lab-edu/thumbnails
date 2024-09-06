import CustomError from "@/utils/common/errors/CustomError";

describe("CustomError", () => {
  it("CustomError 인스턴스가 생성되면 Error 클래스를 상속해야 한다", () => {
    const error = new CustomError("테스트 에러 메시지");

    // CustomError가 Error 클래스를 상속하는지 확인
    expect(error).toBeInstanceOf(Error);
  });

  it("생성된 CustomError의 메시지가 전달되어야 한다", () => {
    const errorMessage = "테스트 에러 메시지";
    const error = new CustomError(errorMessage);

    // CustomError의 메시지가 입력한 대로 설정되었는지 확인
    expect(error.message).toBe(errorMessage);
  });

  it("CustomError의 name 속성이 'CustomError'로 설정되어야 한다", () => {
    const error = new CustomError("테스트 에러 메시지");

    // CustomError의 name이 "CustomError"로 설정되었는지 확인
    expect(error.name).toBe("CustomError");
  });
});
