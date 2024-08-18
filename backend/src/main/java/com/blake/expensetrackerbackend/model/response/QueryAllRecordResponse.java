package com.blake.expensetrackerbackend.model.response;

import com.blake.expensetrackerbackend.enums.TransactionRecordType;

public record QueryAllRecordResponse(String id,
                                     Integer amount,
                                     String transactionDate,
                                     String description,
                                     String categoryId,
                                     String memberId,
                                     String bookId,
                                     TransactionRecordType type) {
}
