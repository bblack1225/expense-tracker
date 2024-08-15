package com.blake.expensetrackerbackend.service;

import com.blake.expensetrackerbackend.model.request.CreateMemberRequest;
import com.blake.expensetrackerbackend.model.request.QueryMemberRequest;
import com.blake.expensetrackerbackend.model.response.CreateMemberResponse;
import com.blake.expensetrackerbackend.model.response.QueryMemberResponse;

import java.util.List;

public interface MemberService {
    List<QueryMemberResponse> queryMembers(QueryMemberRequest request);
    CreateMemberResponse createMember(CreateMemberRequest request);
}
