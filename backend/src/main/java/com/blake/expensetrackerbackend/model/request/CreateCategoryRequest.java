package com.blake.expensetrackerbackend.model.request;

import com.blake.expensetrackerbackend.enums.TransactionRecordType;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateCategoryRequest {

    @NotBlank
    private String name;
    private String icon;

    @NotBlank
    private TransactionRecordType type;

    @NotBlank
    private String bookId;
}
