package com.example.t2303e_wcd;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseUtils {

    private static DatabaseUtils instance;

    private static final String JDBC_URL = "jdbc:mysql://localhost:3308/lab1";
    private static final String JDBC_USER = "root";
    private static final String JDBC_PASSWORD = "123456";

    private DatabaseUtils() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            System.out.println("Connect Db Success");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("JDBC Driver not found", e);
        }
    }

    public static synchronized DatabaseUtils getInstance() {
        if (instance == null) {
            instance = new DatabaseUtils();
        }
        return instance;
    }

    public Connection getConnection() throws SQLException {
        return DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
    }
}
