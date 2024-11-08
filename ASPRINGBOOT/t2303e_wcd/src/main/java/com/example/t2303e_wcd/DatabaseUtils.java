package com.example.t2303e_wcd;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseUtils {

    // Step 1: Create a private static instance of the class (Singleton)
    private static DatabaseUtils instance;

    // Database connection details
    private static final String JDBC_URL = "jdbc:mysql://localhost:3308/lab1";
    private static final String JDBC_USER = "root";
    private static final String JDBC_PASSWORD = "123456";

    // Step 2: Make the constructor private so it cannot be instantiated from outside
    private DatabaseUtils() {
        try {
            // Register the JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            System.out.println("Connect Db Success");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("JDBC Driver not found", e);
        }
    }

    // Step 3: Provide a static method to get the singleton instance
    public static synchronized DatabaseUtils getInstance() {
        // If the instance is null, create a new instance
        if (instance == null) {
            instance = new DatabaseUtils();
        }
        return instance;
    }

    // Step 4: Provide a method to get the database connection
    public Connection getConnection() throws SQLException {
        return DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
    }
}
