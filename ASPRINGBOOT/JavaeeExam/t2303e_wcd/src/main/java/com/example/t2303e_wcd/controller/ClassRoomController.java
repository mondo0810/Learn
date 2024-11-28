package com.example.t2303e_wcd.controller;

import com.example.t2303e_wcd.model.ClassRoom;
import com.example.t2303e_wcd.repository.ClassRoomRepository;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/classroom")
public class ClassRoomController extends HttpServlet {

    private ClassRoomRepository classRoomRepository;

    @Override
    public void init() {
        classRoomRepository = new ClassRoomRepository();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String deleteId = request.getParameter("delete");
        String searchParams = request.getParameter("search");

        if (deleteId != null) {
            // Delete ClassRoom by ID
            try {
                classRoomRepository.delete(Integer.parseInt(deleteId));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        try {
            List<ClassRoom> classrooms = classRoomRepository.findAll();
            request.setAttribute("classrooms", classrooms);
            request.getRequestDispatcher("/classroom/classroom-list.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String idParam = request.getParameter("id");
        int id = idParam != null && !idParam.isEmpty() ? Integer.parseInt(idParam) : 0;
        ClassRoom classRoom = new ClassRoom(id, request.getParameter("name"), request.getParameter("teacherName"), null);
        try {
            classRoomRepository.save(classRoom);
            response.sendRedirect("/classroom");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
