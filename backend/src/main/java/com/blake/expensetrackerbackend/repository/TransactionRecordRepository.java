package com.blake.expensetrackerbackend.repository;

import com.blake.expensetrackerbackend.model.entity.TransactionRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRecordRepository extends JpaRepository<TransactionRecord, String>, JpaSpecificationExecutor<TransactionRecord> {

    @Query("SELECT tr from TransactionRecord tr WHERE  tr.bookId = :bookId AND " +
            "tr.transactionDate between :start AND :end order by tr.transactionDate desc")
    List<TransactionRecord> queryAllRecords(String bookId, LocalDate start, LocalDate end);
}