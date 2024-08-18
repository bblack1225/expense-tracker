package com.blake.expensetrackerbackend.service.api;

import com.blake.expensetrackerbackend.model.request.CreateMemberRequest;
import com.blake.expensetrackerbackend.model.response.CreateMemberResponse;
import com.blake.expensetrackerbackend.model.response.QueryMemberResponse;

import java.util.List;

public interface MemberApiService {
    List<QueryMemberResponse> queryMembers(String bookId);
    CreateMemberResponse createMember(CreateMemberRequest request);
}
