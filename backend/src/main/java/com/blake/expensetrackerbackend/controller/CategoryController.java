package com.blake.expensetrackerbackend.controller;

import com.blake.expensetrackerbackend.model.request.CreateCategoryRequest;
import com.blake.expensetrackerbackend.model.response.CreateCategoryResponse;
import com.blake.expensetrackerbackend.service.api.CategoryApiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryApiService categoryApiService;

    @PostMapping
    public CreateCategoryResponse createCategory(@Valid @RequestBody CreateCategoryRequest request){
        return categoryApiService.createCategory(request);
    }
}
