package com.blake.expensetrackerbackend.service.impl;

import com.blake.expensetrackerbackend.exception.ServiceException;
import com.blake.expensetrackerbackend.model.entity.TransactionRecord;
import com.blake.expensetrackerbackend.model.request.CreateRecordRequest;
import com.blake.expensetrackerbackend.model.response.CreateRecordResponse;
import com.blake.expensetrackerbackend.repository.AccountingBookRepository;
import com.blake.expensetrackerbackend.repository.MemberRepository;
import com.blake.expensetrackerbackend.repository.TransactionCategoryRepository;
import com.blake.expensetrackerbackend.repository.TransactionRecordRepository;
import com.blake.expensetrackerbackend.service.RecordService;
import com.github.shamil.Xid;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@Transactional
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService {

    private final AccountingBookRepository bookRepository;
    private final MemberRepository memberRepository;
    private final TransactionRecordRepository recordRepository;
    private final TransactionCategoryRepository categoryRepository;

    @Override
    public CreateRecordResponse createRecord(CreateRecordRequest request) {
        if(bookRepository.findById(request.getBookId()).isEmpty()){
            throw new ServiceException("Book not found");
        }

        if(memberRepository.findById(request.getMemberId()).isEmpty()){
            throw new ServiceException("Member not found");
        }

        if(categoryRepository.findById(request.getCategoryId()).isEmpty()){
            throw new ServiceException("Category not found");
        }

        TransactionRecord transactionRecord = new TransactionRecord();
        String id = Xid.string();
        transactionRecord.setId(id);
        transactionRecord.setAmount(request.getAmount());
        LocalDate date = LocalDate.parse(request.getTransactionDate());
        transactionRecord.setTransactionDate(date);
        transactionRecord.setDescription(request.getDescription());
        transactionRecord.setCategoryId(request.getCategoryId());
        transactionRecord.setMemberId(request.getMemberId());
        transactionRecord.setBookId(request.getBookId());
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
