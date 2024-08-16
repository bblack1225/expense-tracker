package com.blake.expensetrackerbackend.service.impl;

import com.blake.expensetrackerbackend.exception.ServiceException;
import com.blake.expensetrackerbackend.model.entity.TransactionCategory;
import com.blake.expensetrackerbackend.model.request.CreateCategoryRequest;
import com.blake.expensetrackerbackend.model.response.CreateCategoryResponse;
import com.blake.expensetrackerbackend.repository.AccountingBookRepository;
import com.blake.expensetrackerbackend.repository.TransactionCategoryRepository;
import com.blake.expensetrackerbackend.service.CategoryService;
import com.github.shamil.Xid;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final TransactionCategoryRepository categoryRepository;
    private final AccountingBookRepository bookRepository;

    @Override
    public CreateCategoryResponse createCategory(CreateCategoryRequest request) {
        TransactionCategory category = new TransactionCategory();
        if(bookRepository.findById(request.getBookId()).isEmpty()){
            throw new ServiceException("Accounting book not found");
        }

        String id = Xid.string();
        category.setId(id);
        category.setType(request.getType());
        category.setName(request.getName());
        category.setIcon(request.getIcon());
        category.setBookId(request.getBookId());
        category = categoryRepository.save(category);
        return new CreateCategoryResponse(category.getId(), category.getName(),
                category.getIcon(), category.getType(), category.getBookId());
    }
}
