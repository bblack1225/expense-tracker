package com.blake.expensetrackerbackend.controller;

import com.blake.expensetrackerbackend.model.request.CreateRecordRequest;
import com.blake.expensetrackerbackend.model.response.CreateRecordResponse;
import com.blake.expensetrackerbackend.service.RecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/records")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

    @GetMapping
    public void getRecords(){
        System.out.println("Get records");
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
