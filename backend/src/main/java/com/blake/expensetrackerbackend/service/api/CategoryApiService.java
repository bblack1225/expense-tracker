package com.blake.expensetrackerbackend.service.api;

import com.blake.expensetrackerbackend.model.request.CreateCategoryRequest;
import com.blake.expensetrackerbackend.model.response.CreateCategoryResponse;

public interface CategoryApiService {
    CreateCategoryResponse createCategory(CreateCategoryRequest request);
}
