<%@ page import="com.example.t2303e_wcd.model.PlayerIndexer, com.example.t2303e_wcd.model.Player, com.example.t2303e_wcd.model.Indexer" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:include page="../header.jsp" />

<div class="container">
    <h1>Player Indexer List</h1>

    <!-- Link to add a new Player Indexer -->
    <a href="/player-indexer/player-indexer-form.jsp" class="btn btn-primary mb-3">Add New Player Indexer</a>

<jsp:include page="./player-indexer-form.jsp" />
    <!-- Player Indexer Table -->
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Player</th>
                <th scope="col">Indexer</th>
                <th scope="col">Value</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <%
            // Iterate through the list of player indexers passed from the controller
            List<PlayerIndexer> playerIndexers = (List<PlayerIndexer>) request.getAttribute("playerIndexers");
            for(PlayerIndexer playerIndexer : playerIndexers) {
            %>
            <tr>
                <th scope="row"><%= playerIndexer.getId() %></th>
                <td><%= playerIndexer.getPlayer().getName() %></td>
                <td><%= playerIndexer.getIndexer().getName() %></td>
                <td><%= playerIndexer.getValue() %></td>
                <td>
                    <a href="/player-indexer/player-indexer-form.jsp?id=<%= playerIndexer.getId() %>"
                       class="btn btn-warning btn-sm">Edit</a>
                    <a href="/player-indexer?delete=<%= playerIndexer.getId() %>"
                       class="btn btn-danger btn-sm">Delete</a>
                </td>
            </tr>
            <% } %>
        </tbody>
    </table>
</div>
