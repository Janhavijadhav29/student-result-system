package com.results.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

@Entity
@Table(name = "results")
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Roll No is required")
    private String rollNo;

    @NotBlank(message = "Exam is required")
    private String examName;

    @NotBlank(message = "Subject is required")
    private String subject;

    @NotNull(message = "Marks is required")
    @PositiveOrZero(message = "Marks cannot be negative")
    private Integer marks;

    @NotNull(message = "Max Marks is required")
    @PositiveOrZero(message = "Max Marks cannot be negative")
    private Integer maxMarks;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRollNo() { return rollNo; }
    public void setRollNo(String rollNo) { this.rollNo = rollNo; }

    public String getExamName() { return examName; }
    public void setExamName(String examName) { this.examName = examName; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public Integer getMarks() { return marks; }
    public void setMarks(Integer marks) { this.marks = marks; }

    public Integer getMaxMarks() { return maxMarks; }
    public void setMaxMarks(Integer maxMarks) { this.maxMarks = maxMarks; }
}
