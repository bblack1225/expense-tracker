package com.blake.expensetrackerbackend.service.internal.impl;

import com.blake.expensetrackerbackend.enums.TransactionRecordType;
import com.blake.expensetrackerbackend.exception.ServiceException;
import com.blake.expensetrackerbackend.model.entity.TransactionCategory;
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

    @Override
    public boolean isCategoryMatchTransactionType(String categoryId, TransactionRecordType type) {
        TransactionCategory category = categoryRepository
                .findById(categoryId)
                .orElseThrow(() -> new ServiceException("Category not found"));
        return category.getType().equals(type);
    }
}
