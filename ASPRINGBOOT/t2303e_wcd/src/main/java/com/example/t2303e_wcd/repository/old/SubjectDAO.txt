package com.example.t2303e_wcd.repository;

import com.example.t2303e_wcd.DatabaseUtils;
import com.example.t2303e_wcd.model.Student;
import com.example.t2303e_wcd.model.Subject;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;


public class SubjectDAO {

    public boolean save(Subject subject) {
        String query;
        boolean isUpdate = subject.getId() != 0;
        if (isUpdate) {
            query = "UPDATE Subject SET name = ?, credits = ? WHERE id = ?";
        } else {
            query = "INSERT INTO Subject (name, credits) VALUES (?, ?)";
        }

        try (Connection connection = DatabaseUtils.getInstance().getConnection();
             PreparedStatement statement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {

            statement.setString(1, subject.getName());
            statement.setInt(2, subject.getCredits());

            if (isUpdate) {
                statement.setInt(3, subject.getId());
            }

            int rowsAffected = statement.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean delete(int id) {
        String query = "DELETE FROM Subject WHERE id = ?";

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

    public List<Subject> findAll(String searchParams) {
        String query;
        if (searchParams == null || searchParams.isEmpty()) {
            // If no search parameters, select all Subject
            query = "SELECT * FROM Subject";
        } else {
            // If search parameters are provided, apply search filter
            query = "SELECT * FROM Subject WHERE name LIKE ? OR credits LIKE ?";
        }

        List<Subject> Subject = new ArrayList<>();

        try (Connection connection = DatabaseUtils.getInstance().getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {

            if (searchParams != null && !searchParams.isEmpty()) {
                String searchPattern = "%" + searchParams + "%";
                statement.setString(1, searchPattern);
                statement.setString(2, searchPattern);
            }

            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                Subject subject = new Subject(
                        resultSet.getInt("id"),
                        resultSet.getString("name"),
                        resultSet.getInt("credits"),
                        new HashSet<>() // You will populate the students later
                );
                Subject.add(subject);
            }

            // After retrieving Subject, populate their students
            for (Subject subject : Subject) {
                populateStudents(connection, subject);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return Subject;
    }

    private void populateStudents(Connection connection, Subject subject) throws SQLException {
        String query = "SELECT s.* FROM students s "
                + "JOIN Subject_Student ss ON ss.student_id = s.id "
                + "WHERE ss.subject_id = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setInt(1, subject.getId());
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                Student student = new Student(
                        resultSet.getInt("id"),
                        resultSet.getString("name"),
                        resultSet.getString("email"),
                        resultSet.getString("address"),
                        resultSet.getString("phone"),
                        resultSet.getTimestamp("created_at").toLocalDateTime(),
                        null,
                        null
                );
                subject.getStudents().add(student);
            }
        }
    }
}
