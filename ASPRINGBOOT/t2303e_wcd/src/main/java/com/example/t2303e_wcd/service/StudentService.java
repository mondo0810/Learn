package com.example.t2303e_wcd.service;

import com.example.t2303e_wcd.DTO.StudentResponse;
import com.example.t2303e_wcd.model.Student;
import com.example.t2303e_wcd.repository.IStudentRepository;
import com.example.t2303e_wcd.repository.StudentRepository;

import java.util.List;

public class StudentService {
    private IStudentRepository studentRepository = new StudentRepository();

    public List<StudentResponse> findAll(String searchParams) throws Exception {
        return studentRepository.findAll(searchParams);
    }

    public boolean save(Student student) throws Exception {
        if (student.getEmail().isEmpty() && student.getEmail().length() < 100) {
            throw new Exception("Please fill email");
        }
        return studentRepository.save(student);
    }

    public boolean delete(int id) {
        return studentRepository.delete(id);
    }
}
