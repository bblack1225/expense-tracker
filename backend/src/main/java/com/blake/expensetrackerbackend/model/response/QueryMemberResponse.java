package com.blake.expensetrackerbackend.model.response;

public record QueryMemberResponse(String id, String name, String email, String bookId, Integer share) {
}
