package com.blake.expensetrackerbackend.service.api.impl;

import com.blake.expensetrackerbackend.enums.TransactionRecordType;
import com.blake.expensetrackerbackend.exception.ServiceException;
import com.blake.expensetrackerbackend.model.entity.TransactionRecord;
import com.blake.expensetrackerbackend.model.request.CreateRecordRequest;
import com.blake.expensetrackerbackend.model.request.UpdateRecordRequest;
import com.blake.expensetrackerbackend.model.response.MutateRecordResponse;
import com.blake.expensetrackerbackend.model.response.QueryAllRecordResponse;
import com.blake.expensetrackerbackend.repository.TransactionRecordRepository;
import com.blake.expensetrackerbackend.service.api.RecordApiService;
import com.blake.expensetrackerbackend.service.internal.BookInternalService;
import com.blake.expensetrackerbackend.service.internal.CategoryInternalService;
import com.blake.expensetrackerbackend.service.internal.MemberInternalService;
import com.blake.expensetrackerbackend.utils.DateUtil;
import com.github.shamil.Xid;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class RecordApiServiceImpl implements RecordApiService {

    private final BookInternalService bookInternalService;
    private final MemberInternalService memberInternalService;
    private final CategoryInternalService categoryInternalService;
    private final TransactionRecordRepository recordRepository;

    @Override
    public MutateRecordResponse createRecord(CreateRecordRequest request) {

        val bookId = request.getBookId();
        val memberId = request.getMemberId();
        val categoryId = request.getCategoryId();
        val transactionRecordType = request.getType();

        validateBookExists(bookId);
        validateMemberExists(memberId);
        validateCategoryMatchTransactionType(categoryId, transactionRecordType);

        var transactionRecord = new TransactionRecord();
        String id = Xid.string();
        transactionRecord.setId(id);
        transactionRecord.setAmount(request.getAmount());
        LocalDate date = DateUtil.parseDate(request.getTransactionDate());
        transactionRecord.setTransactionDate(date);
        transactionRecord.setDescription(request.getDescription());
        transactionRecord.setCategoryId(categoryId);
        transactionRecord.setMemberId(memberId);
        transactionRecord.setBookId(bookId);
        transactionRecord.setType(transactionRecordType);
        transactionRecord = recordRepository.save(transactionRecord);
        return new MutateRecordResponse(
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

    @Override
    public List<QueryAllRecordResponse> getRecords(String bookId, String start, String end) {
        List<TransactionRecord> records =
                recordRepository.queryAllRecords(bookId, DateUtil.parseDate(start), DateUtil.parseDate(end));
        return records.stream().map(
                transactionRecord -> new QueryAllRecordResponse(
                        transactionRecord.getId(),
                        transactionRecord.getAmount(),
                        transactionRecord.getTransactionDate().toString(),
                        transactionRecord.getDescription(),
                        transactionRecord.getCategoryId(),
                        transactionRecord.getMemberId(),
                        transactionRecord.getBookId(),
                        transactionRecord.getType()
                )
        ).toList();
    }

    @Override
    public MutateRecordResponse updateRecord(String recordId, UpdateRecordRequest request) {
        val bookId = request.getBookId();
        val memberId = request.getMemberId();
        val categoryId = request.getCategoryId();
        val transactionRecordType = request.getType();

        validateBookExists(bookId);
        validateMemberExists(memberId);
        validateCategoryMatchTransactionType(categoryId, transactionRecordType);

        val existingRecord = recordRepository
                .findById(recordId)
                .orElseThrow(() -> new ServiceException("Record not found"));
        existingRecord.setAmount(request.getAmount());
        existingRecord.setTransactionDate(DateUtil.parseDate(request.getTransactionDate()));
        existingRecord.setDescription(request.getDescription());
        existingRecord.setCategoryId(categoryId);
        existingRecord.setMemberId(memberId);
        existingRecord.setType(transactionRecordType);
        recordRepository.save(existingRecord);

        return new MutateRecordResponse(
                existingRecord.getId(),
                existingRecord.getAmount(),
                request.getTransactionDate(),
                existingRecord.getDescription(),
                existingRecord.getCategoryId(),
                existingRecord.getMemberId(),
                existingRecord.getBookId(),
                existingRecord.getType().name()
        );
    }

    @Override
    public ResponseEntity<Void> deleteRecord(String recordId) {
        recordRepository.deleteById(recordId);
        return ResponseEntity.noContent().build();
    }

    private void validateBookExists(String bookId) {
        if (!bookInternalService.isAccountingBookExists(bookId)) {
            throw new ServiceException("Book not found");
        }
    }

    private void validateMemberExists(String memberId) {
        if (!memberInternalService.isMemberExists(memberId)) {
            throw new ServiceException("Member not found");
        }
    }

    private void validateCategoryMatchTransactionType(String categoryId, TransactionRecordType type) {
        if (!categoryInternalService.isCategoryMatchTransactionType(categoryId, type)) {
            throw new ServiceException("Category Not Match Transaction Type");
        }
    }
}
