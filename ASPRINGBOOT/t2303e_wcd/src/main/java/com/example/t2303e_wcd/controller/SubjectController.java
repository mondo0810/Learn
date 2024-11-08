package com.example.t2303e_wcd.controller;

import com.example.t2303e_wcd.model.Subject;
import com.example.t2303e_wcd.repository.SubjectDAO;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/subject")
public class SubjectController extends HttpServlet {

    private SubjectDAO subjectDAO;

    @Override
    public void init() throws ServletException {
        subjectDAO = new SubjectDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");

        if (action == null) {
            action = "list"; // Default action is to list subjects
        }

        switch (action) {
            case "list":
                listSubjects(request, response);
                break;
            case "delete":
                deleteSubject(request, response);
                break;
            default:
                listSubjects(request, response);
                break;
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");

        if (action == null) {
            action = "save"; // Default action is to save a subject
        }

        switch (action) {
            case "save":
                saveSubject(request, response);
                break;
            case "update":
                updateSubject(request, response);
                break;
            default:
                listSubjects(request, response);
                break;
        }
    }

    // Handle displaying the list of subjects
    private void listSubjects(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Subject> subjects = subjectDAO.findAll("");
        request.setAttribute("subjects", subjects);
        request.getRequestDispatcher("subject/subject-list.jsp").forward(request, response);
    }

    // Handle deleting a subject
    private void deleteSubject(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int id = Integer.parseInt(request.getParameter("id"));
        if (subjectDAO.delete(id)) {
            response.sendRedirect("subject?action=list");
        } else {
            response.getWriter().println("Error deleting subject.");
        }
    }

    // Handle saving a new subject
    private void saveSubject(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String name = request.getParameter("name");
        int credits = Integer.parseInt(request.getParameter("credits"));

        Subject subject = new Subject(0, name, credits, null); // id is 0 for new subjects
        if (subjectDAO.save(subject)) {
            response.sendRedirect("subject?action=list");
        } else {
            response.getWriter().println("Error saving subject.");
        }
    }

    // Handle updating an existing subject
    private void updateSubject(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int id = Integer.parseInt(request.getParameter("id"));
        String name = request.getParameter("name");
        int credits = Integer.parseInt(request.getParameter("credits"));

        Subject subject = new Subject(id, name, credits, null); // existing id
        if (subjectDAO.save(subject)) {
            response.sendRedirect("/subject");
        } else {
            response.getWriter().println("Error updating subject.");
        }
    }
}
