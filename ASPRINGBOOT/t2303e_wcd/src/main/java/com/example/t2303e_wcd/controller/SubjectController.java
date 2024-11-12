package com.example.t2303e_wcd.controller;

import com.example.t2303e_wcd.model.Subject;
import com.example.t2303e_wcd.repository.SubjectRepository;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/subject")
public class SubjectController extends HttpServlet {

    private SubjectRepository subjectRepository = new SubjectRepository();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String deleteId = request.getParameter("delete");
        if (deleteId != null) {
            try {
                subjectRepository.delete(Integer.parseInt(deleteId));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        try {
            List<Subject> subjects = subjectRepository.findAll();
            request.setAttribute("subjects", subjects);
            request.getRequestDispatcher("subject/subject-list.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String idParam = request.getParameter("id");
        String name = request.getParameter("name");
        int credits = Integer.parseInt(request.getParameter("credits"));

        int id = idParam != null && !idParam.isEmpty() ? Integer.parseInt(idParam) : 0;

        Subject subject = new Subject(id, name, credits, null);

        try {
            subjectRepository.save(subject);
            response.sendRedirect("/subject");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
