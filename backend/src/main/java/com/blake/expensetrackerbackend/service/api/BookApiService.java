package com.blake.expensetrackerbackend.service.api;

import com.blake.expensetrackerbackend.model.request.CreateAccountBookRequest;
import com.blake.expensetrackerbackend.model.response.CreateAccountBookResponse;

public interface BookApiService {
    CreateAccountBookResponse createBook(CreateAccountBookRequest request);
}
