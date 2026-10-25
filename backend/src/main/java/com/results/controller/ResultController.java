package com.results.controller;

import com.results.entity.Result;
import com.results.service.ResultService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    private final ResultService service;

    public ResultController(ResultService service) {
        this.service = service;
    }

    @GetMapping
    public List<Result> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Result getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/search")
    public List<Result> search(@RequestParam String keyword) {
        return service.search(keyword);
    }

    @PostMapping
    public ResponseEntity<Result> create(@Valid @RequestBody Result result) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(result));
    }

    @PutMapping("/{id}")
    public Result update(@PathVariable Long id, @Valid @RequestBody Result result) {
        return service.update(id, result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
