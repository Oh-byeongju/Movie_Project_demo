// 23-01-13 아이디 중복 예외처리 구현(오병주)
package com.movie.Spring_backend.exceptionlist;

import com.movie.Spring_backend.error.exception.ErrorCode;
import com.movie.Spring_backend.error.exception.InvalidValueException;

public class IdDuplicateException extends InvalidValueException {
    // 아이디 중복시 처리되는 예외
    public IdDuplicateException(String message) {
        super(message, ErrorCode.ID_DUPLICATION);
        // message와 error 코드를 이용하여 부모 클래스의 생성자 InvalidValueException 생성자 호출
    }
}