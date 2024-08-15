package com.blake.expensetrackerbackend.model.response;

import com.blake.expensetrackerbackend.enums.TransactionRecordType;

public record CreateCategoryResponse(String id, String name, String icon, TransactionRecordType type, String bookId) {
}
