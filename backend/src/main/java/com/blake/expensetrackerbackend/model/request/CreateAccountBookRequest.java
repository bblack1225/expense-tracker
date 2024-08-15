package com.blake.expensetrackerbackend.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateAccountBookRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String pin;
}
