package com.blake.expensetrackerbackend.exception;

import lombok.Data;

public class ServiceException extends RuntimeException{
    public ServiceException(String message) {
        super(message);
    }
}
