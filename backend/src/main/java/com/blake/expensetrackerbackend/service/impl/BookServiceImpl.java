package com.blake.expensetrackerbackend.service.impl;

import com.blake.expensetrackerbackend.model.entity.AccountingBook;
import com.blake.expensetrackerbackend.model.request.CreateAccountBookRequest;
import com.blake.expensetrackerbackend.model.response.CreateAccountBookResponse;
import com.blake.expensetrackerbackend.repository.AccountingBookRepository;
import com.blake.expensetrackerbackend.service.BookService;
import com.github.shamil.Xid;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final AccountingBookRepository bookRepository;
    @Override
    public CreateAccountBookResponse createBook(CreateAccountBookRequest request) {
        AccountingBook book = new AccountingBook();
        String id = Xid.string();
        book.setId(id);
        book.setName(request.getName());
        book.setPin(request.getPin());
        book = bookRepository.save(book);
        return new CreateAccountBookResponse(book.getId(), book.getName(), book.getPin());
    }
}
