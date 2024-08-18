package com.blake.expensetrackerbackend.service.api;

import com.blake.expensetrackerbackend.model.request.CreateRecordRequest;
import com.blake.expensetrackerbackend.model.response.CreateRecordResponse;
import com.blake.expensetrackerbackend.model.response.QueryAllRecordResponse;

import java.util.List;

public interface RecordApiService {
    CreateRecordResponse createRecord(CreateRecordRequest createRecordRequest);
    List<QueryAllRecordResponse> getRecords(String bookId, String start, String end);
}
