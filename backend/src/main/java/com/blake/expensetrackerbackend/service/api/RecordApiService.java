package com.blake.expensetrackerbackend.service.api;

import com.blake.expensetrackerbackend.model.request.CreateRecordRequest;
import com.blake.expensetrackerbackend.model.request.UpdateRecordRequest;
import com.blake.expensetrackerbackend.model.response.MutateRecordResponse;
import com.blake.expensetrackerbackend.model.response.QueryAllRecordResponse;

import java.util.List;

public interface RecordApiService {
    MutateRecordResponse createRecord(CreateRecordRequest createRecordRequest);
    List<QueryAllRecordResponse> getRecords(String bookId, String start, String end);
    MutateRecordResponse updateRecord(String recordId, UpdateRecordRequest request);
}
