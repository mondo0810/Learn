<%@ page import="com.example.t2303e_wcd.model.Subject" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:include page="../header.jsp" />

<div class="container">
    <h1><%= (request.getParameter("id") != null ? "Edit" : "Create") %> Subject</h1>

    <form action="/subject" method="POST">
        <!-- Hidden input to hold the subject ID if editing -->
        <input type="hidden" name="id" value="<%= request.getParameter("id") != null ? request.getParameter("id") : "" %>">

        <!-- Name input field -->
        <div class="mb-3">
            <label for="name" class="form-label">Subject Name</label>
            <input type="text" class="form-control" id="name" name="name"
                   value="<%= request.getParameter("name") != null ? request.getParameter("name") : "" %>" required>
        </div>

        <!-- Credits input field -->
        <div class="mb-3">
            <label for="credits" class="form-label">Credits</label>
            <input type="number" class="form-control" id="credits" name="credits"
                   value="<%= request.getParameter("credits") != null ? request.getParameter("credits") : "" %>" required>
        </div>

        <!-- Submit button (Save or Update based on action) -->
        <button type="submit" class="btn btn-primary">
            <%= (request.getParameter("id") != null ? "Update" : "Save") %> Subject
        </button>

        <!-- Hidden action input to determine if this is a save or update -->
        <input type="hidden" name="action" value="<%= (request.getParameter("id") != null ? "update" : "save") %>">
    </form>

    <!-- Link back to subject list -->
    <a href="subject?action=list" class="btn btn-secondary mt-3">Back to Subject List</a>
</div>

