package com.blake.expensetrackerbackend.service.impl;

import com.blake.expensetrackerbackend.exception.ServiceException;
import com.blake.expensetrackerbackend.model.entity.Member;
import com.blake.expensetrackerbackend.model.request.CreateMemberRequest;
import com.blake.expensetrackerbackend.model.request.QueryMemberRequest;
import com.blake.expensetrackerbackend.model.response.CreateMemberResponse;
import com.blake.expensetrackerbackend.model.response.QueryMemberResponse;
import com.blake.expensetrackerbackend.repository.AccountingBookRepository;
import com.blake.expensetrackerbackend.repository.MemberRepository;
import com.blake.expensetrackerbackend.service.MemberService;
import com.github.shamil.Xid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final AccountingBookRepository bookRepository;

    @Override
    public List<QueryMemberResponse> queryMembers(QueryMemberRequest request) {
        List<Member> members = memberRepository.findByBookId(request.getBookId());
        return members
                .stream()
                .map(member -> new QueryMemberResponse(member.getId(), member.getName(),
                        member.getEmail(), member.getBookId(), member.getShare())).toList();
    }

    @Override
    public CreateMemberResponse createMember(CreateMemberRequest request) {
        Member member = new Member();
        if(bookRepository.findById(request.getBookId()).isEmpty()){
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
