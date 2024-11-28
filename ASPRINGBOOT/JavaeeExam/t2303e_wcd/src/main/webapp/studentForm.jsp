<%@ page import="com.example.t2303e_wcd.model.Student" %>
<%@ page import="com.example.t2303e_wcd.model.ClassRoom" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:include page="header.jsp" />
<div class="container">
    <h1>Student Form</h1>
    <form action="/studentForm" method="post">
        <input type="hidden" name="id" value="<%= request.getParameter("id") != null ? request.getParameter("id") : "" %>"/>

        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" name="name" value="<%= request.getParameter("name") != null ? request.getParameter("name") : "" %>" required>
        </div>

        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name="email" value="<%= request.getParameter("email") != null ? request.getParameter("email") : "" %>" required>
        </div>

        <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input type="text" class="form-control" id="address" name="address" value="<%= request.getParameter("address") != null ? request.getParameter("address") : "" %>" required>
        </div>

        <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input type="text" class="form-control" id="phone" name="phone" value="<%= request.getParameter("phone") != null ? request.getParameter("phone") : "" %>" required>
        </div>

        <!-- Dropdown for selecting classroom -->
        <div class="mb-3">
            <label for="classroomId" class="form-label">Select Classroom</label>
            <select class="form-select" id="classroomId" name="classroomId" required>
                <option value="" disabled selected>Select a classroom</option>
                <%
                    List<ClassRoom> classrooms = (List<ClassRoom>) request.getAttribute("classrooms");
                    for (ClassRoom classroom : classrooms) {
                %>
                    <option value="<%= classroom.getId() %>" <%= request.getParameter("classroomId") != null && request.getParameter("classroomId").equals(String.valueOf(classroom.getId())) ? "selected" : "" %>>
                        <%= classroom.getName() %> - <%= classroom.getTeacherName() %>
                    </option>
                <%
                    }
                %>
            </select>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>
