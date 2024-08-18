package com.blake.expensetrackerbackend.service.api.impl;

import com.blake.expensetrackerbackend.exception.ServiceException;
import com.blake.expensetrackerbackend.model.entity.Member;
import com.blake.expensetrackerbackend.model.request.CreateMemberRequest;
import com.blake.expensetrackerbackend.model.response.CreateMemberResponse;
import com.blake.expensetrackerbackend.model.response.QueryMemberResponse;
import com.blake.expensetrackerbackend.repository.MemberRepository;
import com.blake.expensetrackerbackend.service.api.MemberApiService;
import com.blake.expensetrackerbackend.service.internal.BookInternalService;
import com.github.shamil.Xid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberApiServiceImpl implements MemberApiService {

    private final MemberRepository memberRepository;
    private final BookInternalService bookInternalService;

    @Override
    public List<QueryMemberResponse> queryMembers(String bookId) {
        List<Member> members = memberRepository.findByBookId(bookId);
        return members
                .stream()
                .map(member -> new QueryMemberResponse(member.getId(), member.getName(),
                        member.getEmail(), member.getBookId(), member.getShare())).toList();
    }

    @Override
    public CreateMemberResponse createMember(CreateMemberRequest request) {
        Member member = new Member();
        if(!bookInternalService.isAccountingBookExists(request.getBookId())){
            throw new ServiceException("Accounting book not found");
        }
        String id = Xid.string();
        member.setId(id);
        member.setName(request.getName());
        member.setEmail(request.getEmail());
        member.setBookId(request.getBookId());
        member.setShare(request.getShare());
        member = memberRepository.save(member);
        return new CreateMemberResponse
                (
                member.getId(), member.getName(), member.getEmail(), member.getBookId(), member.getShare()
        );
    }
}
