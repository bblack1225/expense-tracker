package com.blake.expensetrackerbackend.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class QueryMemberRequest {

    @NotBlank
    private String bookId;
}
