// 23-01-12 에러처리 구현(오병주)
package com.movie.Spring_backend.error.exception;

public class InvalidValueException extends BusinessException {

    public InvalidValueException(String value) {
        super(value, ErrorCode.INVALID_INPUT_VALUE);
    }
    public InvalidValueException(String value, ErrorCode errorCode) {
        super(value, errorCode);
    }
}