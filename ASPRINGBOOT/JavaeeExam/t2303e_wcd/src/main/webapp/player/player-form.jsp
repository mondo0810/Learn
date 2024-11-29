<%@ page import="com.example.t2303e_wcd.model.Player, com.example.t2303e_wcd.model.Indexer" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<style>


    h1 {
        text-align: center;
        color: #ff6600;
    }

    form {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
    }

    .form-group {
        flex: 1 1 calc(33.333% - 15px); /* 3 cột mỗi hàng */
        display: flex;
        flex-direction: column;
    }

    .form-group label {
        font-weight: bold;
        margin-bottom: 5px;
        color: #333;
    }

    .form-group input,
    .form-group select {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 16px;
    }

    .form-actions {
        width: 100%;
        text-align: center;
        margin-top: 20px;
    }

    .form-actions button {
        padding: 10px 20px;
        border: none;
        background-color: #ff6600;
        color: white;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
    }

    .form-actions button:hover {
        background-color: #e55d00;
    }

    .form-actions a {
        padding: 10px 20px;
        text-decoration: none;
        color: #333;
        background-color: #ddd;
        border-radius: 5px;
        margin-left: 10px;
    }

    .form-actions a:hover {
        background-color: #ccc;
    }
</style>

<div class="container">
    <h3><%= (request.getParameter("id") != null) ? "Edit Player" : "Add New Player" %></h3>
    <form action="/player" method="post">
        <!-- Cột 1: Name -->
        <div class="form-group">
            <label for="name" class="form-label">Name</label>
            <input type="text" id="name" name="name"
                   value="<%= request.getParameter("name") != null ? request.getParameter("name") : "" %>"
                   required>
        </div>

        <!-- Cột 2: Full Name -->
        <div class="form-group">
            <label for="fullName" class="form-label">Full Name</label>
            <input type="text" id="fullName" name="fullName"
                   value="<%= request.getParameter("fullName") != null ? request.getParameter("fullName") : "" %>"
                   required>
        </div>

        <!-- Cột 3: Age -->
        <div class="form-group">
            <label for="age" class="form-label">Age</label>
            <input type="number" id="age" name="age"
                   value="<%= request.getParameter("age") != null ? request.getParameter("age") : "" %>"
                   required>
        </div>

        <!-- Cột 1: Indexer -->
        <div class="form-group">
            <label for="indexerId" class="form-label">Indexer</label>
            <select id="indexerId" name="indexerId" required>
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

        <!-- Cột 2: Value -->
        <div class="form-group">
            <label for="value" class="form-label">Value</label>
            <input type="number" step="0.01" id="value" name="value"
                   value="<%= request.getParameter("value") != null ? request.getParameter("value") : "" %>"
                   required>
        </div>

        <!-- Cột 3: Hidden ID -->
        <input type="hidden" name="id" value="<%= request.getParameter("id") != null ? request.getParameter("id") : "" %>">

        <!-- Hàng cuối: Button -->
        <div class="form-actions">
            <button type="submit">Save</button>
            <a href="/player">Cancel</a>
        </div>
    </form>
</div>
