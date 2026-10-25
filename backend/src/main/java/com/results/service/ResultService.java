package com.results.service;

import com.results.entity.Result;
import com.results.exception.ResourceNotFoundException;
import com.results.repository.ResultRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultService {

    private final ResultRepository repository;

    public ResultService(ResultRepository repository) {
        this.repository = repository;
    }

    public List<Result> getAll() {
        return repository.findAll();
    }

    public Result getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Result not found with id: " + id));
    }

    public Result create(Result result) {
        result.setId(null);
        return repository.save(result);
    }

    public Result update(Long id, Result updated) {
        Result existing = getById(id);
        existing.setRollNo(updated.getRollNo());
        existing.setExamName(updated.getExamName());
        existing.setSubject(updated.getSubject());
        existing.setMarks(updated.getMarks());
        existing.setMaxMarks(updated.getMaxMarks());
        return repository.save(existing);
    }

    public void delete(Long id) {
        Result existing = getById(id);
        repository.delete(existing);
    }

    public List<Result> search(String keyword) {
        return repository.findByRollNoContainingIgnoreCase(keyword);
    }
}
