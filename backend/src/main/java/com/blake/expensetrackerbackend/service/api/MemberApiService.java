package com.blake.expensetrackerbackend.service.api;

import com.blake.expensetrackerbackend.model.request.CreateMemberRequest;
import com.blake.expensetrackerbackend.model.request.QueryMemberRequest;
import com.blake.expensetrackerbackend.model.response.CreateMemberResponse;
import com.blake.expensetrackerbackend.model.response.QueryMemberResponse;

import java.util.List;

public interface MemberApiService {
    List<QueryMemberResponse> queryMembers(QueryMemberRequest request);
    CreateMemberResponse createMember(CreateMemberRequest request);
}
