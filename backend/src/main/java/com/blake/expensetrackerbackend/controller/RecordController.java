package com.blake.expensetrackerbackend.controller;

import com.blake.expensetrackerbackend.model.request.CreateRecordRequest;
import com.blake.expensetrackerbackend.model.response.CreateRecordResponse;
import com.blake.expensetrackerbackend.model.response.QueryAllRecordResponse;
import com.blake.expensetrackerbackend.service.api.RecordApiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
    public CreateRecordResponse createRecord(@Valid @RequestBody CreateRecordRequest request) {
        return recordService.createRecord(request);
    }

    @PutMapping("/{id}")
    public void updateRecord(@PathVariable Long id){
        System.out.println("Update record with id: " + id);
    }

    @DeleteMapping("/{id}")
    public void deleteRecord(@PathVariable Long id){
        System.out.println("Delete record with id: " + id);
    }
}
