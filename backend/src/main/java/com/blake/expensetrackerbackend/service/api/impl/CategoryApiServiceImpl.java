package com.blake.expensetrackerbackend.service.api.impl;

import com.blake.expensetrackerbackend.enums.TransactionRecordType;
import com.blake.expensetrackerbackend.exception.ServiceException;
import com.blake.expensetrackerbackend.model.entity.TransactionCategory;
import com.blake.expensetrackerbackend.model.request.CreateCategoryRequest;
import com.blake.expensetrackerbackend.model.response.CreateCategoryResponse;
import com.blake.expensetrackerbackend.model.response.QueryAllCategoryResponse;
import com.blake.expensetrackerbackend.repository.AccountingBookRepository;
import com.blake.expensetrackerbackend.repository.TransactionCategoryRepository;
import com.blake.expensetrackerbackend.service.api.CategoryApiService;
import com.blake.expensetrackerbackend.service.internal.BookInternalService;
import com.blake.expensetrackerbackend.service.internal.impl.BookInternalServiceImpl;
import com.github.shamil.Xid;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryApiServiceImpl implements CategoryApiService {

    private final TransactionCategoryRepository categoryRepository;
    private final BookInternalService bookInternalService;

    @Override
    public CreateCategoryResponse createCategory(CreateCategoryRequest request) {
        TransactionCategory category = new TransactionCategory();
        if(!bookInternalService.isAccountingBookExists(request.getBookId())){
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

    @Override
    public QueryAllCategoryResponse queryCategories(String bookId) {
        if(!bookInternalService.isAccountingBookExists(bookId)){
            throw new ServiceException("Accounting book not found");
        }
        List<TransactionCategory> categories = categoryRepository.findByBookId(bookId);
        List<QueryAllCategoryResponse.CategoryRes> inCategories = new ArrayList<>();
        List<QueryAllCategoryResponse.CategoryRes> outCategories = new ArrayList<>();
        for(TransactionCategory category : categories){
            QueryAllCategoryResponse.CategoryRes categoryRes = new QueryAllCategoryResponse.CategoryRes();
            categoryRes.setId(category.getId());
            categoryRes.setName(category.getName());
            categoryRes.setIcon(category.getIcon());
            categoryRes.setType(category.getType());
            categoryRes.setBookId(category.getBookId());
            if(category.getType().equals(TransactionRecordType.IN)){
                inCategories.add(categoryRes);
            }else{
                outCategories.add(categoryRes);
            }
        }
        QueryAllCategoryResponse response = new QueryAllCategoryResponse();
        response.setInCategories(inCategories);
        response.setOutCategories(outCategories);
        return response;
    }
}
