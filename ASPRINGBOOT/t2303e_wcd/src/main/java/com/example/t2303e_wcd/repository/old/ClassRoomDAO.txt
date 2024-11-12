package com.example.t2303e_wcd.repository;

import com.example.t2303e_wcd.DatabaseUtils;
import com.example.t2303e_wcd.model.ClassRoom;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ClassRoomDAO {

    public boolean save(ClassRoom classRoom) {
        String query;
        boolean isUpdate = classRoom.getId() != 0;

        if (isUpdate) {
            query = "UPDATE ClassRoom SET name = ?, teacherName = ? WHERE id = ?";
        } else {
            query = "INSERT INTO ClassRoom (name, teacherName) VALUES (?, ?)";
        }

        try (Connection connection = DatabaseUtils.getInstance().getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {

            statement.setString(1, classRoom.getName());
            statement.setString(2, classRoom.getTeacherName());

            if (isUpdate) {
                statement.setInt(3, classRoom.getId()); // Set ID for updating an existing ClassRoom
            }

            int rowsAffected = statement.executeUpdate();
            return rowsAffected > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean delete(int id) {
        String query = "DELETE FROM ClassRoom WHERE id = ?";

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

    public List<ClassRoom> findAll(String searchParams) {
        String query;
        if (searchParams == null || searchParams.isEmpty()) {
            query = "SELECT * FROM ClassRoom";
        } else {
            query = "SELECT * FROM ClassRoom WHERE name LIKE ? OR teacherName LIKE ?";
        }

        List<ClassRoom> classrooms = new ArrayList<>();

        try (Connection connection = DatabaseUtils.getInstance().getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {

            if (searchParams != null && !searchParams.isEmpty()) {
                String searchPattern = "%" + searchParams + "%";
                statement.setString(1, searchPattern);
                statement.setString(2, searchPattern);
            }

            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                ClassRoom classRoom = new ClassRoom(
                        resultSet.getInt("id"),
                        resultSet.getString("name"),
                        resultSet.getString("teacherName")
                );
                classrooms.add(classRoom);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return classrooms;
    }
}
