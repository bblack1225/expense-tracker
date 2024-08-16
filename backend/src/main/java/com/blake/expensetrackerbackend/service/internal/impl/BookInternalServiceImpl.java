package com.blake.expensetrackerbackend.service.internal.impl;

import com.blake.expensetrackerbackend.repository.AccountingBookRepository;
import com.blake.expensetrackerbackend.service.internal.BookInternalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookInternalServiceImpl implements BookInternalService {

    private final AccountingBookRepository bookRepository;
    @Override
    public boolean isAccountingBookExists(String bookId) {
        return bookRepository.existsById(bookId);
    }
}
