package com.example.t2303e_wcd.controller;

import com.example.t2303e_wcd.DTO.StudentResponse;
import com.example.t2303e_wcd.repository.StudentRepository;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

@WebServlet("")
public class StudentController extends HttpServlet {
    private StudentRepository studentRepository;

    @Override
    public void init() {
        studentRepository = new StudentRepository();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        String deleteId = request.getParameter("delete");
        String searchParams = request.getParameter("search");
        if (deleteId != null) {
            try {
                studentRepository.delete(Integer.parseInt(deleteId));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        try {
            List<StudentResponse> students = studentRepository.findAll(searchParams);
            System.out.println(students);
            request.setAttribute("students", students);
            request.getRequestDispatcher("index.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
