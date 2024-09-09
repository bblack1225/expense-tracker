package com.blake.expensetrackerbackend.service.api.impl;

import com.blake.expensetrackerbackend.enums.TransactionRecordType;
import com.blake.expensetrackerbackend.exception.ServiceException;
import com.blake.expensetrackerbackend.model.entity.TransactionRecord;
import com.blake.expensetrackerbackend.model.request.CreateRecordRequest;
import com.blake.expensetrackerbackend.model.response.MutateRecordResponse;
import com.blake.expensetrackerbackend.repository.TransactionRecordRepository;
import com.blake.expensetrackerbackend.service.internal.BookInternalService;
import com.blake.expensetrackerbackend.service.internal.CategoryInternalService;
import com.blake.expensetrackerbackend.service.internal.MemberInternalService;
import com.github.shamil.Xid;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RecordApiServiceImplTest {

    @Mock
    private BookInternalService bookInternalService;

    @Mock
    private MemberInternalService memberInternalService;

    @Mock
    private CategoryInternalService categoryInternalService;

    @Mock
    private TransactionRecordRepository recordRepository;

    @InjectMocks
    private RecordApiServiceImpl recordService;

    @Test
    void testCreateRecordSuccess(){
        // Given
        CreateRecordRequest request = new CreateRecordRequest();
        request.setBookId("bookId");
        request.setMemberId("memberId");
        request.setCategoryId("categoryId");
        request.setAmount(1000);
        request.setDescription("description");
        request.setTransactionDate("2021-01-01");
        request.setType(TransactionRecordType.OUT);

        when(bookInternalService.isAccountingBookExists(request.getBookId())).thenReturn(true);
        when(memberInternalService.isMemberExists(request.getMemberId())).thenReturn(true);
        when(categoryInternalService.isCategoryMatchTransactionType(request.getCategoryId(), request.getType())).thenReturn(true);

        TransactionRecord savedRecord = new TransactionRecord();
        String expectedId = Xid.string();
        savedRecord.setId(expectedId);
        savedRecord.setAmount(request.getAmount());
        savedRecord.setBookId(request.getBookId());
        savedRecord.setMemberId(request.getMemberId());
        savedRecord.setCategoryId(request.getCategoryId());
        savedRecord.setDescription(request.getDescription());
        savedRecord.setTransactionDate(LocalDate.parse(request.getTransactionDate()));
        savedRecord.setType(TransactionRecordType.OUT);
        when(recordRepository.save(any(TransactionRecord.class))).thenReturn(savedRecord);

        // When
        MutateRecordResponse response = recordService.createRecord(request);

        // Then
        assertNotNull(response);
        assertEquals(expectedId, response.id());
        assertEquals(request.getBookId(), response.bookId());
        assertEquals(request.getMemberId(), response.memberId());
        assertEquals(request.getCategoryId(), response.categoryId());
        assertEquals(request.getAmount(), response.amount());
        assertEquals(request.getTransactionDate(), response.transactionDate());
        assertEquals(request.getType().name(), response.type());
        verify(recordRepository, times(1)).save(any(TransactionRecord.class));
    }

    @Test
    void testCreateRecordFailedWithIncorrectDateFormat(){
        // Given
        CreateRecordRequest request = new CreateRecordRequest();
        request.setBookId("bookId");
        request.setMemberId("memberId");
        request.setCategoryId("categoryId");
        request.setAmount(1000);
        request.setDescription("description");
        request.setTransactionDate("2021-01-01 11:00:00");
        request.setType(TransactionRecordType.OUT);

        when(bookInternalService.isAccountingBookExists(request.getBookId())).thenReturn(true);
        when(memberInternalService.isMemberExists(request.getMemberId())).thenReturn(true);
        when(categoryInternalService.isCategoryMatchTransactionType(request.getCategoryId(), request.getType())).thenReturn(true);

        // when
        ServiceException exception = assertThrows(ServiceException.class, () -> {
                recordService.createRecord(request);
        });

        // then
        assertTrue(exception.getMessage().contains("Invalid date format"));
    }
}