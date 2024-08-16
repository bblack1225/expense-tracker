package com.blake.expensetrackerbackend.controller;

import com.blake.expensetrackerbackend.model.request.CreateAccountBookRequest;
import com.blake.expensetrackerbackend.model.response.CreateAccountBookResponse;
import com.blake.expensetrackerbackend.service.api.BookApiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class AccountingBookController {

    private final BookApiService bookApiService;

    @PostMapping
    public CreateAccountBookResponse createBook(@Valid @RequestBody CreateAccountBookRequest request){
        return bookApiService.createBook(request);
    }
}
