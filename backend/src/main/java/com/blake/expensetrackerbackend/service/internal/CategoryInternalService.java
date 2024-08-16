package com.blake.expensetrackerbackend.service.internal;

import com.blake.expensetrackerbackend.enums.TransactionRecordType;

public interface CategoryInternalService {
    boolean isCategoryExists(String categoryId);
    boolean isCategoryMatchTransactionType(String categoryId, TransactionRecordType type);
}
