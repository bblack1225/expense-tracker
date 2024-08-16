package com.blake.expensetrackerbackend.service.api;

import com.blake.expensetrackerbackend.model.request.CreateRecordRequest;
import com.blake.expensetrackerbackend.model.response.CreateRecordResponse;

public interface RecordApiService {
    CreateRecordResponse createRecord(CreateRecordRequest createRecordRequest);
}
