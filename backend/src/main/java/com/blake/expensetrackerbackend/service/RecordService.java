package com.blake.expensetrackerbackend.service;

import com.blake.expensetrackerbackend.model.request.CreateRecordRequest;
import com.blake.expensetrackerbackend.model.response.CreateRecordResponse;

public interface RecordService {
    CreateRecordResponse createRecord(CreateRecordRequest createRecordRequest);
}
