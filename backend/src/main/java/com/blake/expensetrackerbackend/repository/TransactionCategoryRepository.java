package com.blake.expensetrackerbackend.repository;

import com.blake.expensetrackerbackend.model.entity.TransactionCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface TransactionCategoryRepository extends JpaRepository<TransactionCategory, String>, JpaSpecificationExecutor<TransactionCategory> {


    List<TransactionCategory> findByBookId(String bookId);
}