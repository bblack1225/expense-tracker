package com.blake.expensetrackerbackend.service;

import com.blake.expensetrackerbackend.model.request.CreateCategoryRequest;
import com.blake.expensetrackerbackend.model.response.CreateCategoryResponse;

public interface CategoryService {
    CreateCategoryResponse createCategory(CreateCategoryRequest request);
}
