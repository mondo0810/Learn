<%@ page import="com.example.t2303e_wcd.model.Subject" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:include page="../header.jsp" />

<div class="container">
    <h1>Subject List</h1>

    <!-- Link to add a new subject -->
    <a href="/subject/subject-form.jsp" class="btn btn-primary mb-3">Add New Subject</a>

    <!-- Search form (optional) -->
    <form action="subject" method="get" class="d-flex mb-3">
        <input type="text" name="search" class="form-control me-2" placeholder="Search by name, credits" />
        <button type="submit" class="btn btn-primary">Search</button>
    </form>

    <!-- Subject table -->
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Credits</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <%
            // Iterate through the list of subjects
            List<Subject> subjects = (List<Subject>) request.getAttribute("subjects");
            for(Subject s : subjects) {
            %>
            <tr>
                <th scope="row"><%= s.getId() %></th>
                <td><%= s.getName() %></td>
                <td><%= s.getCredits() %></td>
                <td>
                    <a href="/subject/subject-form.jsp?id=<%= s.getId() %>&name=<%= s.getName() %>&credits=<%= s.getCredits() %>"
                       class="btn btn-warning btn-sm">Edit</a>
                    <a href="subject?delete=<%= s.getId() %>" class="btn btn-danger btn-sm">Delete</a>
                </td>
            </tr>
            <% } %>
        </tbody>
    </table>
</div>
