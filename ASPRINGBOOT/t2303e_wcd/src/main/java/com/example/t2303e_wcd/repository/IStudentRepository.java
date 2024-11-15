package com.example.t2303e_wcd.repository;

import com.example.t2303e_wcd.DTO.StudentResponse;
import com.example.t2303e_wcd.model.Student;

import java.util.List;

public interface IStudentRepository {
    public List<StudentResponse> findAll(String searchParams);

    public boolean save(Student student);

    public boolean delete(int id);
}
