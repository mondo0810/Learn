<%@ page import="com.example.t2303e_wcd.model.ClassRoom" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:include page="../header.jsp" />
<div class="container">
    <h1>Classroom List</h1>
    <!-- Link to add new classroom -->
    <a href="/classroom/classroom-form.jsp" class="btn btn-primary mb-3">Add New Classroom</a>

    <!-- Search form -->
    <form action="/classroom" method="get" class="d-flex mb-3">
        <input type="text" name="search" class="form-control me-2" placeholder="Search by name or teacher" />
        <button type="submit" class="btn btn-primary">Search</button>
    </form>

    <!-- Classroom table -->
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Teacher Name</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
        <%
        // Iterate through the list of classrooms
        List<ClassRoom> classrooms = (List<ClassRoom>) request.getAttribute("classrooms");
        for(ClassRoom c : classrooms) {
        %>
            <tr>
                <th scope="row"><%= c.getId() %></th>
                <td><%= c.getName() %></td>
                <td><%= c.getTeacherName() %></td>
                <td>
                    <!-- Edit and Delete links -->
                    <a href="classroom-form.jsp?id=<%= c.getId() %>&name=<%= c.getName() %>&teacherName=<%= c.getTeacherName() %>" class="btn btn-warning btn-sm">Edit</a>
                    <a href="?delete=<%= c.getId() %>" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure you want to delete this classroom?');">Delete</a>
                </td>
            </tr>
        <% } %>
        </tbody>
    </table>
</div>
