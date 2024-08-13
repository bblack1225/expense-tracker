package com.blake.expensetrackerbackend.repository;

import com.blake.expensetrackerbackend.model.entity.AccountingBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AccountingBookRepository extends JpaRepository<AccountingBook, String>, JpaSpecificationExecutor<AccountingBook> {

}