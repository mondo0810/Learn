package com.example.t2303e_wcd.controller;

import com.example.t2303e_wcd.model.ClassRoom;
import com.example.t2303e_wcd.repository.ClassRoomDAO;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/classroom")
public class ClassRoomController extends HttpServlet {

    private final ClassRoomDAO classRoomDAO = new ClassRoomDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String deleteId = request.getParameter("delete");
        String searchParams = request.getParameter("search");

        if (deleteId != null) {
            // Delete ClassRoom by ID
            try {
                classRoomDAO.delete(Integer.parseInt(deleteId));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        try {
            List<ClassRoom> classrooms = classRoomDAO.findAll(searchParams);
            request.setAttribute("classrooms", classrooms);
            request.getRequestDispatcher("/classroom/classroom-list.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String idParam = request.getParameter("id");
        String name = request.getParameter("name");
        String teacherName = request.getParameter("teacherName");

        int id = idParam != null && !idParam.isEmpty() ? Integer.parseInt(idParam) : 0;

        ClassRoom classRoom = new ClassRoom(id, name, teacherName);

        try {
            classRoomDAO.save(classRoom);
            response.sendRedirect("/classroom");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
