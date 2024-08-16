package com.blake.expensetrackerbackend.service.api.impl;

import com.blake.expensetrackerbackend.model.entity.Member;
import com.blake.expensetrackerbackend.model.request.CreateMemberRequest;
import com.blake.expensetrackerbackend.model.response.CreateMemberResponse;
import com.blake.expensetrackerbackend.repository.MemberRepository;
import com.blake.expensetrackerbackend.service.internal.BookInternalService;
import com.github.shamil.Xid;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MemberApiServiceImplTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private BookInternalService bookInternalService;

    @InjectMocks
    private MemberApiServiceImpl memberApiService;


    @Test
    void testCreateMemberSuccess(){
        // Given
        CreateMemberRequest request = new CreateMemberRequest();
        request.setName("Test Name");
        request.setBookId("Test Book Id");
        request.setEmail("test@example.com");
        request.setShare(6000);

        // When
        Member member = new Member();
        String expectedId = Xid.string();
        member.setId(expectedId);
        member.setName(request.getName());
        member.setBookId(request.getBookId());
        member.setEmail(request.getEmail());

        when(bookInternalService.isAccountingBookExists(request.getBookId())).thenReturn(true);
        when(memberRepository.save(any(Member.class))).thenReturn(member);

        // Then
        CreateMemberResponse response = memberApiService.createMember(request);
        assertEquals(expectedId, response.id());
        assertEquals(member.getName(), response.name());
        assertEquals(member.getBookId(), response.bookId());
        verify(memberRepository, times(1)).save(any(Member.class));
    }
}