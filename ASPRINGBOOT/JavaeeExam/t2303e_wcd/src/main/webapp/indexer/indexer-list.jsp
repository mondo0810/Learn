<%@ page import="com.example.t2303e_wcd.model.Indexer" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:include page="../header.jsp" />

<div class="container">
    <h1>Indexer List</h1>

    <!-- Link to add a new indexer -->
    <a href="/indexer/indexer-form.jsp" class="btn btn-primary mb-3">Add New Indexer</a>

    <!-- Indexer table -->
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Min Value</th>
                <th scope="col">Max Value</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <%
            // Iterate through the list of indexers passed from the controller
            List<Indexer> indexers = (List<Indexer>) request.getAttribute("indexers");
            for(Indexer indexer : indexers) {
            %>
            <tr>
                <th scope="row"><%= indexer.getIndexId() %></th>
                <td><%= indexer.getName() %></td>
                <td><%= indexer.getValueMin() %></td>
                <td><%= indexer.getValueMax() %></td>
                <td>
                    <!-- Edit and Delete buttons -->
                    <a href="/indexer/indexer-form.jsp?id=<%= indexer.getIndexId() %>&name=<%= indexer.getName() %>&valueMin=<%= indexer.getValueMin() %>&valueMax=<%= indexer.getValueMax() %>"
                       class="btn btn-warning btn-sm">Edit</a>
                    <a href="indexer?delete=<%= indexer.getIndexId() %>" class="btn btn-danger btn-sm">Delete</a>
                </td>
            </tr>
            <% } %>
        </tbody>
    </table>
</div>
