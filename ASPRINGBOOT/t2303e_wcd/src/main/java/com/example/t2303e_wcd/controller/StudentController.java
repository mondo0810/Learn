package com.example.t2303e_wcd.controller;

import com.example.t2303e_wcd.DTO.StudentResponse;
import com.example.t2303e_wcd.repository.StudentDAO;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

@WebServlet("")
public class StudentController extends HttpServlet {

    private StudentDAO studentDAO = new StudentDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        String deleteId = request.getParameter("delete");
        String searchParams = request.getParameter("search");
        if (deleteId != null) {
            // Xóa sinh viên theo id
            try {
                studentDAO.delete(Integer.parseInt(deleteId));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        try {
            List<StudentResponse> students = studentDAO.findAll(searchParams);
            request.setAttribute("students", students);
            request.getRequestDispatcher("index.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
