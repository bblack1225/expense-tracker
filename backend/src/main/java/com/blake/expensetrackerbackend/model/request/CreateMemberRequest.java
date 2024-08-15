package com.blake.expensetrackerbackend.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateMemberRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String bookId;

    @NotBlank
    private String email;

    @NotNull
    private Integer share;
}
