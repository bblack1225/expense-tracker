package com.blake.expensetrackerbackend.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class BaseExceptionHandler {

    @ExceptionHandler(value = ServiceException.class)
    public ResponseEntity<ErrorResponse> handleServiceException(ServiceException se){
        log.error("ServiceException Error: ", se);
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setErrorMessage(se.getMessage());
        return ResponseEntity.badRequest().body(errorResponse);
    }
}
