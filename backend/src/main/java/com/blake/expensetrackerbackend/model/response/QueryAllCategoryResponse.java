package com.blake.expensetrackerbackend.model.response;

import com.blake.expensetrackerbackend.enums.TransactionRecordType;
import lombok.Data;

import java.util.List;

@Data
public class QueryAllCategoryResponse {

    private List<CategoryRes> inCategories;
    private List<CategoryRes> outCategories;

    @Data
    public static class CategoryRes {
        private String id;
        private String name;
        private String icon;
        private TransactionRecordType type;
        private String bookId;

    }
}
