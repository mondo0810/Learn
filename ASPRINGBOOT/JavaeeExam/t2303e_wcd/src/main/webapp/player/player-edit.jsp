<%@ page import="com.example.t2303e_wcd.model.Player, com.example.t2303e_wcd.model.Indexer" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:include page="../header.jsp" />

<div class="container">

    <h1><%= (request.getParameter("id") != null) ? "Edit Player" : "Add New Player" %></h1>
    <form action="/player" method="post">
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" name="name"
                   value="<%= request.getParameter("name") != null ? request.getParameter("name") : "" %>" required>
        </div>

        <div class="mb-3">
            <label for="fullName" class="form-label">Full Name</label>
            <input type="text" class="form-control" id="fullName" name="fullName"
                   value="<%= request.getParameter("fullName") != null ? request.getParameter("fullName") : "" %>" required>
        </div>

        <div class="mb-3">
            <label for="age" class="form-label">Age</label>
            <input type="number" class="form-control" id="age" name="age"
                   value="<%= request.getParameter("age") != null ? request.getParameter("age") : "" %>" required>
        </div>

        <div class="mb-3">
            <label for="indexerId" class="form-label">Indexer</label>
            <select class="form-control" id="indexerId" name="indexerId" required>
                <%
                    List<Indexer> indexers = (List<Indexer>) request.getAttribute("indexers");
                    for (Indexer indexer : indexers) {
                %>
                    <option value="<%= indexer.getIndexId() %>"
                            <%= (request.getParameter("indexerId") != null && request.getParameter("indexerId").equals(String.valueOf(indexer.getIndexId()))) ? "selected" : "" %>>
                        <%= indexer.getName() %>
                    </option>
                <% } %>
            </select>
        </div>

        <div class="mb-3">
            <label for="value" class="form-label">Value</label>
            <input type="number" step="0.01" class="form-control" id="value" name="value"
                   value="<%= request.getParameter("value") != null ? request.getParameter("value") : "" %>" required>
        </div>

        <input type="hidden" name="id" value="<%= request.getParameter("id") != null ? request.getParameter("id") : "" %>">

        <button type="submit" class="btn btn-primary">Save</button>
        <a href="/player" class="btn btn-secondary">Cancel</a>
    </form>
</div>
