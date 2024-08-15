package com.blake.expensetrackerbackend.controller;

import com.blake.expensetrackerbackend.model.request.CreateMemberRequest;
import com.blake.expensetrackerbackend.model.request.QueryMemberRequest;
import com.blake.expensetrackerbackend.model.response.CreateMemberResponse;
import com.blake.expensetrackerbackend.model.response.QueryMemberResponse;
import com.blake.expensetrackerbackend.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    public List<QueryMemberResponse> queryMembers(@Valid @RequestBody QueryMemberRequest request){
        return memberService.queryMembers(request);
    }

    @PostMapping
    public CreateMemberResponse createMember(@Valid @RequestBody CreateMemberRequest request){
        return memberService.createMember(request);
    }
}
