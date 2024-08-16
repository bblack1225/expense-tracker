package com.blake.expensetrackerbackend.service.internal.impl;

import com.blake.expensetrackerbackend.repository.TransactionCategoryRepository;
import com.blake.expensetrackerbackend.service.internal.CategoryInternalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryInternalServiceImpl implements CategoryInternalService {

    private final TransactionCategoryRepository categoryRepository;
    @Override
    public boolean isCategoryExists(String categoryId) {
        return categoryRepository.existsById(categoryId);
    }
}
