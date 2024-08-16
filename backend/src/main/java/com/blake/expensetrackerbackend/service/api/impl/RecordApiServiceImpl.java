package com.blake.expensetrackerbackend.service.api.impl;

import com.blake.expensetrackerbackend.exception.ServiceException;
import com.blake.expensetrackerbackend.model.entity.TransactionRecord;
import com.blake.expensetrackerbackend.model.request.CreateRecordRequest;
import com.blake.expensetrackerbackend.model.response.CreateRecordResponse;
import com.blake.expensetrackerbackend.repository.AccountingBookRepository;
import com.blake.expensetrackerbackend.repository.MemberRepository;
import com.blake.expensetrackerbackend.repository.TransactionCategoryRepository;
import com.blake.expensetrackerbackend.repository.TransactionRecordRepository;
import com.blake.expensetrackerbackend.service.api.RecordApiService;
import com.blake.expensetrackerbackend.service.internal.BookInternalService;
import com.blake.expensetrackerbackend.service.internal.CategoryInternalService;
import com.blake.expensetrackerbackend.service.internal.MemberInternalService;
import com.blake.expensetrackerbackend.utils.DateUtil;
import com.github.shamil.Xid;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@Transactional
@RequiredArgsConstructor
public class RecordApiServiceImpl implements RecordApiService {

    private final BookInternalService bookInternalService;
    private final MemberInternalService memberInternalService;
    private final CategoryInternalService categoryInternalService;
    private final TransactionRecordRepository recordRepository;

    @Override
    public CreateRecordResponse createRecord(CreateRecordRequest request) {

        String bookId = request.getBookId();
        String memberId = request.getMemberId();
        String categoryId = request.getCategoryId();
        if(!bookInternalService.isAccountingBookExists(bookId)){
            throw new ServiceException("Book not found");
        }

        if(!memberInternalService.isMemberExists(memberId)){
            throw new ServiceException("Member not found");
        }

        if(!categoryInternalService.isCategoryMatchTransactionType(categoryId, request.getType())){
            throw new ServiceException("Category Not Match Transaction Type");
        }

        TransactionRecord transactionRecord = new TransactionRecord();
        String id = Xid.string();
        transactionRecord.setId(id);
        transactionRecord.setAmount(request.getAmount());
        LocalDate date = DateUtil.parseDate(request.getTransactionDate());
        transactionRecord.setTransactionDate(date);
        transactionRecord.setDescription(request.getDescription());
        transactionRecord.setCategoryId(categoryId);
        transactionRecord.setMemberId(memberId);
        transactionRecord.setBookId(bookId);
        transactionRecord.setType(request.getType());
        transactionRecord = recordRepository.save(transactionRecord);
        return new CreateRecordResponse(
                transactionRecord.getId(),
                transactionRecord.getAmount(),
                request.getTransactionDate(),
                transactionRecord.getDescription(),
                transactionRecord.getCategoryId(),
                transactionRecord.getMemberId(),
                transactionRecord.getBookId(),
                transactionRecord.getType().name()
        );
    }
}
