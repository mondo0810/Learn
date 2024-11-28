<%@ page import="com.example.t2303e_wcd.model.ClassRoom" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:include page="../header.jsp" />

<div class="container">
    <h1>Classroom Form</h1>
    <form action="/classroom" method="post">
        <input type="hidden" name="id" value="<%= request.getParameter("id") != null ? request.getParameter("id") : "" %>"/>

        <div class="mb-3">
            <label for="name" class="form-label">Classroom Name</label>
            <input type="text" class="form-control" id="name" name="name" value="<%= request.getParameter("name") != null ? request.getParameter("name") : "" %>" required>
        </div>

        <div class="mb-3">
            <label for="teacherName" class="form-label">Teacher Name</label>
            <input type="text" class="form-control" id="teacherName" name="teacherName" value="<%= request.getParameter("teacherName") != null ? request.getParameter("teacherName") : "" %>" required>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>
