package com.blake.expensetrackerbackend.model.response;

public record CreateMemberResponse(String id, String name, String email, String bookId, Integer share) {
}
