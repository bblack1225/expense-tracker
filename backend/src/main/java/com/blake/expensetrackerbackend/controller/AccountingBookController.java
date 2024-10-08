package com.blake.expensetrackerbackend.controller;

import com.blake.expensetrackerbackend.model.request.CreateAccountBookRequest;
import com.blake.expensetrackerbackend.model.response.CreateAccountBookResponse;
import com.blake.expensetrackerbackend.model.response.QueryAllCategoryResponse;
import com.blake.expensetrackerbackend.model.response.QueryAllRecordResponse;
import com.blake.expensetrackerbackend.model.response.QueryMemberResponse;
import com.blake.expensetrackerbackend.service.api.BookApiService;
import com.blake.expensetrackerbackend.service.api.CategoryApiService;
import com.blake.expensetrackerbackend.service.api.MemberApiService;
import com.blake.expensetrackerbackend.service.api.RecordApiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class AccountingBookController {

    private final BookApiService bookApiService;
    private final MemberApiService memberApiService;
    private final CategoryApiService categoryApiService;
    private final RecordApiService recordService;



    @PostMapping
    public CreateAccountBookResponse createBook(@Valid @RequestBody CreateAccountBookRequest request){
        return bookApiService.createBook(request);
    }

    @GetMapping("/{bookId}/members")
    public List<QueryMemberResponse> queryMembers(@PathVariable String bookId){
        return memberApiService.queryMembers(bookId);
    }

    @GetMapping("/{bookId}/categories")
    public QueryAllCategoryResponse queryCategories(@PathVariable String bookId){
        return categoryApiService.queryCategories(bookId);
    }

    @GetMapping("/{bookId}/records")
    public List<QueryAllRecordResponse> getRecords(@PathVariable String bookId,
                                                   @RequestParam String start, @RequestParam String end){
        return recordService.getRecords(bookId, start, end);
    }
}
