package com.blake.expensetrackerbackend.service.api;

import com.blake.expensetrackerbackend.model.request.CreateCategoryRequest;
import com.blake.expensetrackerbackend.model.response.CreateCategoryResponse;
import com.blake.expensetrackerbackend.model.response.QueryAllCategoryResponse;

public interface CategoryApiService {
    CreateCategoryResponse createCategory(CreateCategoryRequest request);
    QueryAllCategoryResponse queryCategories(String bookId);

}
