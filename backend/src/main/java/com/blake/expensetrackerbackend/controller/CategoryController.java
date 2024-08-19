package com.blake.expensetrackerbackend.controller;

import com.blake.expensetrackerbackend.model.request.CreateCategoryRequest;
import com.blake.expensetrackerbackend.model.response.CreateCategoryResponse;
import com.blake.expensetrackerbackend.model.response.QueryAllCategoryResponse;
import com.blake.expensetrackerbackend.service.api.CategoryApiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryApiService categoryApiService;

    @GetMapping("/{bookId}")
    public QueryAllCategoryResponse queryCategories(@PathVariable String bookId){
        return categoryApiService.queryCategories(bookId);
    }

    @PostMapping
    public CreateCategoryResponse createCategory(@Valid @RequestBody CreateCategoryRequest request){
        return categoryApiService.createCategory(request);
    }
}
