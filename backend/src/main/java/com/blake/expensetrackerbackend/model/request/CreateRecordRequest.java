package com.blake.expensetrackerbackend.model.request;

import com.blake.expensetrackerbackend.enums.TransactionRecordType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateRecordRequest {

    @NotNull
    private Integer amount;

    @NotBlank
    private String transactionDate;

    private String description;

    @NotBlank
    private String categoryId;

    @NotBlank
    private String memberId;

    @NotBlank
    private String bookId;

    @NotBlank
    private TransactionRecordType type;
}
