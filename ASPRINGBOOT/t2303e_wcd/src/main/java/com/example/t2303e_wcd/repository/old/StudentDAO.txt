package com.example.t2303e_wcd.repository;

import com.example.t2303e_wcd.DTO.StudentResponse;
import com.example.t2303e_wcd.DatabaseUtils;
import com.example.t2303e_wcd.model.ClassRoom;
import com.example.t2303e_wcd.model.Student;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class StudentDAO {

    public boolean save(Student student) {
        String query;
        boolean isUpdate = student.getId() != 0;
        if (isUpdate) {
            query = "UPDATE Student SET name = ?, email = ?, address = ?, phone = ?, createdAt = ?, classRoomId= ? WHERE id = ?";
        } else {
            query = "INSERT INTO Student (name, email, address, phone, createdAt, classRoomId) VALUES (?, ?, ?, ?, ?, ?)";
        }

        try (Connection connection = DatabaseUtils.getInstance().getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {

            statement.setString(1, student.getName());
            statement.setString(2, student.getEmail());
            statement.setString(3, student.getAddress());
            statement.setString(4, student.getPhone());
            statement.setTimestamp(5, Timestamp.valueOf(student.getCreatedAt()));
            statement.setString(6, String.valueOf(student.getClassRoomId()));

            if (isUpdate) {
                statement.setInt(7, student.getId()); // Set the ID for the update
            }

            int rowsAffected = statement.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean delete(int id) {
        String query = "DELETE FROM Student WHERE id = ?";

        try (Connection connection = DatabaseUtils.getInstance().getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {

            statement.setInt(1, id);

            int rowsAffected = statement.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<StudentResponse> findAll(String searchParams) {
        String query;
        if (searchParams == null || searchParams.isEmpty()) {
            // If no search parameters, select all Student
            query = "SELECT * FROM Student";
        } else {
            // If search parameters are provided, apply search filter
            query = "SELECT * FROM Student WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?";
        }

        List<StudentResponse> StudentResponse = new ArrayList<>();

        try (Connection connection = DatabaseUtils.getInstance().getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {

            if (searchParams != null && !searchParams.isEmpty()) {
                String searchPattern = "%" + searchParams + "%";
                statement.setString(1, searchPattern);
                statement.setString(2, searchPattern);
                statement.setString(3, searchPattern);
            }

            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                StudentResponse student = new StudentResponse(
                        resultSet.getInt("id"),
                        resultSet.getString("name"),
                        resultSet.getString("email"),
                        resultSet.getString("address"),
                        resultSet.getString("phone"),
                        resultSet.getTimestamp("createdAt").toLocalDateTime(),
                        getClassRoomById(resultSet.getInt("classRoomId")),
                        resultSet.getInt("classRoomId"),
                        null
                );
                StudentResponse.add(student);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return StudentResponse;
    }

    public String getClassRoomById(int id) {
        String query = "SELECT * FROM ClassRoom WHERE id = ?"; // Assuming you have a ClassRoom table
        ClassRoom classRoom = null;

        try (Connection connection = DatabaseUtils.getInstance().getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {

            statement.setInt(1, id); // Set the classRoomId to the query

            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                // Extract the classRoom details from the resultSet
                classRoom = new ClassRoom(
                        resultSet.getInt("id"),
                        resultSet.getString("name"),
                        resultSet.getString("teacherName")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return classRoom.getName();
    }

}
