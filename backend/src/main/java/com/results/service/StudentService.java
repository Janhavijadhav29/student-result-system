package com.results.service;

import com.results.entity.Student;
import com.results.exception.ResourceNotFoundException;
import com.results.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getAll() {
        return repository.findAll();
    }

    public Student getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    public Student create(Student student) {
        student.setId(null);
        return repository.save(student);
    }

    public Student update(Long id, Student updated) {
        Student existing = getById(id);
        existing.setRollNo(updated.getRollNo());
        existing.setName(updated.getName());
        existing.setClassName(updated.getClassName());
        existing.setEmail(updated.getEmail());
        return repository.save(existing);
    }

    public void delete(Long id) {
        Student existing = getById(id);
        repository.delete(existing);
    }

    public List<Student> search(String keyword) {
        return repository.findByNameContainingIgnoreCase(keyword);
    }
}
