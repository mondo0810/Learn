package com.example.t2303e_wcd.controller;

import com.example.t2303e_wcd.model.ClassRoom;
import com.example.t2303e_wcd.model.Student;
import com.example.t2303e_wcd.repository.ClassRoomRepository;
import com.example.t2303e_wcd.repository.StudentRepository;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@WebServlet("/studentForm")
public class StudentFormController extends HttpServlet {

    private StudentRepository studentRepository = new StudentRepository();
    private ClassRoomRepository classRoomRepository = new ClassRoomRepository();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        List<ClassRoom> classrooms = classRoomRepository.findAll();

        request.setAttribute("classrooms", classrooms);

        try {
            request.getRequestDispatcher("studentForm.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String idParam = request.getParameter("id");
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String address = request.getParameter("address");
        String phone = request.getParameter("phone");
        String classroomIdParam = request.getParameter("classroomId");

        int classroomId = (classroomIdParam != null && !classroomIdParam.isEmpty()) ? Integer.parseInt(classroomIdParam) : 0;

        ClassRoom classRoom = classRoomRepository.findAll().stream()
                .filter(c -> c.getId() == classroomId)
                .findFirst()
                .orElse(null);

        Student student = new Student(
                idParam != null && !idParam.isEmpty() ? Integer.parseInt(idParam) : 0,
                name,
                email,
                address,
                phone,
                LocalDateTime.now(),
                classRoom,
                null
        );

        try {
            studentRepository.save(student);
            response.sendRedirect("/");
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Không thể lưu sinh viên.");
        }
    }
}
