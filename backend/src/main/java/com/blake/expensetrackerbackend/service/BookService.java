package com.blake.expensetrackerbackend.service;

import com.blake.expensetrackerbackend.model.request.CreateAccountBookRequest;
import com.blake.expensetrackerbackend.model.response.CreateAccountBookResponse;

public interface BookService {
    CreateAccountBookResponse createBook(CreateAccountBookRequest request);
}
