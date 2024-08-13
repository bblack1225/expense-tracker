package com.blake.expensetrackerbackend.repository;

import com.blake.expensetrackerbackend.model.entity.TransactionCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TransactionCategoryRepository extends JpaRepository<TransactionCategory, String>, JpaSpecificationExecutor<TransactionCategory> {

}