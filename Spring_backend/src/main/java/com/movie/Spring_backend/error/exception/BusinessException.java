// 23-01-13 아이디 중복 예외처리 구현(오병주)
package com.movie.Spring_backend.error.exception;

public class BusinessException extends RuntimeException {

    private final ErrorCode errorCode;

    public BusinessException(String message, ErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
        // message 값으로 RuntimeException 예외처리를 하고 error 코드에 따라 enum 클래스에서 받은 정보를 프론트단으로 전달
    }

    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
        // errorCode를 통해 얻은 에러 메시지 값으로 RuntimeException 예외처리를 하고 enum 클래스에서 받은 정보를 프론트단으로 전달
    }

    public ErrorCode getErrorCode() {
        return errorCode;
        // errorCode의 get 함수
    }

}