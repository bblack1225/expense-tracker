package com.blake.expensetrackerbackend.service.api.impl;

import com.blake.expensetrackerbackend.enums.TransactionRecordType;
import com.blake.expensetrackerbackend.model.entity.TransactionCategory;
import com.blake.expensetrackerbackend.model.request.CreateCategoryRequest;
import com.blake.expensetrackerbackend.model.response.CreateCategoryResponse;
import com.blake.expensetrackerbackend.repository.AccountingBookRepository;
import com.blake.expensetrackerbackend.repository.TransactionCategoryRepository;
import com.blake.expensetrackerbackend.service.internal.BookInternalService;
import com.github.shamil.Xid;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategoryApiServiceImplTest {

    @Mock
    private TransactionCategoryRepository categoryRepository;

    @Mock
    private BookInternalService bookInternalService;

    @InjectMocks
    private CategoryApiServiceImpl categoryService;


    @Test
    void testCreateCategorySuccess(){
        // Given
        CreateCategoryRequest request = new CreateCategoryRequest();
        request.setName("Test Name");
        request.setIcon("Test Icon");
        request.setType(TransactionRecordType.OUT);
        request.setBookId("Test Book Id");

        // When
        TransactionCategory category = new TransactionCategory();
        String expectedId = Xid.string();
        category.setId(expectedId);
        category.setName(request.getName());
        category.setIcon(request.getIcon());
        category.setType(request.getType());
        category.setBookId(request.getBookId());

        when(bookInternalService.isAccountingBookExists(request.getBookId())).thenReturn(true);
        when(categoryRepository.save(any(TransactionCategory.class))).thenReturn(category);

        // Then
        CreateCategoryResponse response = categoryService.createCategory(request);
        assertEquals(expectedId, response.id());
        assertEquals(category.getName(), response.name());
        assertEquals(category.getBookId(), response.bookId());
        verify(categoryRepository, times(1)).save(any(TransactionCategory.class));
    }


}