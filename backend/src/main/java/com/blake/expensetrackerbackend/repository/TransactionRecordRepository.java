package com.blake.expensetrackerbackend.repository;

import com.blake.expensetrackerbackend.model.entity.TransactionRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TransactionRecordRepository extends JpaRepository<TransactionRecord, String>, JpaSpecificationExecutor<TransactionRecord> {

}