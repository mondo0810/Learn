package com.example.t2303e_wcd.controller;

import com.example.t2303e_wcd.model.ClassRoom;
import com.example.t2303e_wcd.model.Student;
import com.example.t2303e_wcd.repository.ClassRoomDAO;
import com.example.t2303e_wcd.repository.StudentDAO;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@WebServlet("/studentForm")
public class StudentFormController extends HttpServlet {

    private StudentDAO studentDAO = new StudentDAO();
    private ClassRoomDAO classRoomDAO = new ClassRoomDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Fetch the list of classrooms
        List<ClassRoom> classrooms = classRoomDAO.findAll(null);

        // Set classrooms as a request attribute
        request.setAttribute("classrooms", classrooms);

        // Forward the request to the form JSP
        try {
            request.getRequestDispatcher("studentForm.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Handle form submission
        String idParam = request.getParameter("id");
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String address = request.getParameter("address");
        String phone = request.getParameter("phone");
        String classroomIdParam = request.getParameter("classroomId"); // Get the selected classroom ID

        // Convert to integer
        int classroomId = (classroomIdParam != null && !classroomIdParam.isEmpty()) ? Integer.parseInt(classroomIdParam) : 0;

        Student student = new Student(
                idParam != null && !idParam.isEmpty() ? Integer.parseInt(idParam) : 0,
                name,
                email,
                address,
                phone,
                Timestamp.valueOf(LocalDateTime.now()).toLocalDateTime(),
                classroomId,
                null

        );

        try {
            studentDAO.save(student); // Save the student to the database
            response.sendRedirect("/");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
