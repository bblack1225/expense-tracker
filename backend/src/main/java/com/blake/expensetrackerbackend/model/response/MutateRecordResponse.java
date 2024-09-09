package com.blake.expensetrackerbackend.model.response;

public record MutateRecordResponse(
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
