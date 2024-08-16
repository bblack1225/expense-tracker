package com.blake.expensetrackerbackend.service.api.impl;

import com.blake.expensetrackerbackend.model.entity.AccountingBook;
import com.blake.expensetrackerbackend.model.request.CreateAccountBookRequest;
import com.blake.expensetrackerbackend.model.response.CreateAccountBookResponse;
import com.blake.expensetrackerbackend.repository.AccountingBookRepository;
import com.github.shamil.Xid;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookApiServiceImplTest {

    @Mock
    private AccountingBookRepository bookRepository;

    @InjectMocks
    private BookApiServiceImpl bookService;

    @Test
    void testCreateBook() {
        // Given
        CreateAccountBookRequest request = new CreateAccountBookRequest();
        request.setName("Test Name");
        request.setPin("Test Pin");

        AccountingBook book = new AccountingBook();
        String expectedId = Xid.string();
        book.setId(expectedId);
        book.setName(request.getName());
        book.setPin(request.getPin());

        when(bookRepository.save(any(AccountingBook.class))).thenReturn(book);

        // When
        CreateAccountBookResponse response = bookService.createBook(request);

        // Then
        assertEquals(expectedId, response.bookId());
        assertEquals(book.getName(), response.name());
        assertEquals(book.getPin(), response.pin());
        verify(bookRepository, times(1)).save(any(AccountingBook.class));
    }
}