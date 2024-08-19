package com.blake.expensetrackerbackend.controller;

import com.blake.expensetrackerbackend.model.request.CreateMemberRequest;
import com.blake.expensetrackerbackend.model.response.CreateMemberResponse;
import com.blake.expensetrackerbackend.model.response.QueryMemberResponse;
import com.blake.expensetrackerbackend.service.api.MemberApiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberApiService memberApiService;

//    @GetMapping("/{bookId}")
//    public List<QueryMemberResponse> queryMembers(@PathVariable String bookId){
//        return memberApiService.queryMembers(bookId);
//    }

    @PostMapping
    public CreateMemberResponse createMember(@Valid @RequestBody CreateMemberRequest request){
        return memberApiService.createMember(request);
    }
}
