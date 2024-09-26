package com.blake.expensetrackerbackend.controller;

import com.blake.expensetrackerbackend.model.request.CreateRecordRequest;
import com.blake.expensetrackerbackend.model.request.UpdateRecordRequest;
import com.blake.expensetrackerbackend.model.response.MutateRecordResponse;
import com.blake.expensetrackerbackend.model.response.QueryAllRecordResponse;
import com.blake.expensetrackerbackend.service.api.RecordApiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/records")
@RequiredArgsConstructor
public class RecordController {

    private final RecordApiService recordService;

    @GetMapping("/{bookId}")
    public List<QueryAllRecordResponse> getRecords(@PathVariable String bookId,
                                                   @RequestParam String start, @RequestParam String end){
        return recordService.getRecords(bookId, start, end);
    }

    @PostMapping
    public MutateRecordResponse createRecord(@Valid @RequestBody CreateRecordRequest request) {
        return recordService.createRecord(request);
    }

    @PutMapping("/{recordId}")
    public MutateRecordResponse updateRecord(@PathVariable String recordId, @RequestBody UpdateRecordRequest request){
        return recordService.updateRecord(recordId, request);
    }

    // TODO 通過驗證來判斷是否可以刪除該資料
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecord(@PathVariable String id){
        return recordService.deleteRecord(id);
    }
}
