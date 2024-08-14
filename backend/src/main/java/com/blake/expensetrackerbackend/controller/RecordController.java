package com.blake.expensetrackerbackend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/records")
public class RecordController {

    @GetMapping
    public void getRecords(){
        System.out.println("Get records");
    }

    @PostMapping
    public void addRecord(){
        System.out.println("Add record");
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
