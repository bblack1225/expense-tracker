package com.blake.expensetrackerbackend.model.response;

public record CreateRecordResponse(
        String id,
        Integer amount,
        String transactionDate,
        String description,
        String categoryId,
        String memberId,
        String bookId,
        String type
) {
}
