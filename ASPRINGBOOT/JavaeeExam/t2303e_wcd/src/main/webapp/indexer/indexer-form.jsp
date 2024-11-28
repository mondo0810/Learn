<%@ page import="com.example.t2303e_wcd.model.Indexer" %>
<%@ page import="com.example.t2303e_wcd.model.Player" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:include page="../header.jsp" />

<div class="container">
    <h1><%= (request.getParameter("id") != null) ? "Edit Indexer" : "Add New Indexer" %></h1>

    <!-- Form to add/edit indexer -->
    <form action="/indexer" method="post">
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" name="name"
                   value="<%= request.getParameter("name") != null ? request.getParameter("name") : "" %>" required>
        </div>

        <div class="mb-3">
            <label for="valueMin" class="form-label">Min Value</label>
            <input type="number" step="0.01" class="form-control" id="valueMin" name="valueMin"
                   value="<%= request.getParameter("valueMin") != null ? request.getParameter("valueMin") : "" %>" required>
        </div>

        <div class="mb-3">
            <label for="valueMax" class="form-label">Max Value</label>
            <input type="number" step="0.01" class="form-control" id="valueMax" name="valueMax"
                   value="<%= request.getParameter("valueMax") != null ? request.getParameter("valueMax") : "" %>" required>
        </div>

        <!-- Hidden field for ID (if editing an existing indexer) -->
        <input type="hidden" name="id" value="<%= request.getParameter("id") != null ? request.getParameter("id") : "" %>">

        <button type="submit" class="btn btn-primary">Save</button>
        <a href="/indexer" class="btn btn-secondary">Cancel</a>
    </form>
</div>
