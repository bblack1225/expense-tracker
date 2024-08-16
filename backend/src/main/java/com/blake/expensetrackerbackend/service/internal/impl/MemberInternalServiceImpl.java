package com.blake.expensetrackerbackend.service.internal.impl;

import com.blake.expensetrackerbackend.repository.MemberRepository;
import com.blake.expensetrackerbackend.service.internal.MemberInternalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberInternalServiceImpl implements MemberInternalService {

    private final MemberRepository memberRepository;

    @Override
    public boolean isMemberExists(String memberId) {
        return memberRepository.existsById(memberId);
    }
}
