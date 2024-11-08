<%@ page import="com.example.t2303e_wcd.DTO.StudentResponse" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:include page="header.jsp" />
<div class="container">
    <h1>Student List</h1>
    <!-- Link to add new student -->
    <a href="/studentForm" class="btn btn-primary mb-3">Add New Student</a>

<form action="/" method="get" class="d-flex mb-3">
    <input type="text" name="search" class="form-control me-2" placeholder="Search by name,phone,email" />
    <button type="submit" class="btn btn-primary">Search</button>
</form>

    <!-- Student table -->
    <table class="table">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Telephone</th>
            <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <%
        // Iterate through the list of students
        List<StudentResponse> students = (List<StudentResponse>) request.getAttribute("students");
        for(StudentResponse s : students) {
        %>
        <tr>
            <th scope="row"><%= s.getId() %></th>
            <td><%= s.getName() %></td>
            <td><%= s.getEmail() %></td>
            <td><%= s.getAddress() %></td>
            <td><%= s.getPhone() %></td>
             <td><%= s.getClassRoomName() %></td>
            <td>
                <a href="/studentForm?id=<%= s.getId() %>&name=<%= s.getName() %>&email=<%= s.getEmail() %>&address=<%= s.getAddress() %>&phone=<%= s.getPhone() %>&classroomId=<%= s.getClassRoomId() %>" class="btn btn-warning btn-sm">Edit</a>
                <a href="?delete=<%= s.getId() %>" class="btn btn-danger btn-sm">Delete</a>
            </td>
        </tr>
        <% } %>
        </tbody>
    </table>

