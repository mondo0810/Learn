<%@ page import="com.example.t2303e_wcd.model.Player, com.example.t2303e_wcd.model.Indexer, com.example.t2303e_wcd.model.PlayerIndexer" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:include page="../header.jsp" />

<div class="container">
    <h1>Player List</h1>
<jsp:include page="./player-form.jsp" />
    <!-- Add New Player Button -->
    <a href="/player-form" class="btn btn-primary mb-3">Add New Player</a>

    <!-- Player List Table -->
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Full Name</th>
                <th scope="col">Age</th>
                <th scope="col">Indexer</th>
                <th scope="col">Value</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <%
                // Get the players list from the request
                List<Player> players = (List<Player>) request.getAttribute("players");
                for (Player player : players) {
                    // Get the associated PlayerIndexer for the current player
                    List<PlayerIndexer> playerIndexers = player.getPlayerIndexers();
                    String indexerName = "N/A";
                    String value = "N/A";

                    // If there are associated PlayerIndexers, display the first one
                    if (playerIndexers != null && !playerIndexers.isEmpty()) {
                        PlayerIndexer playerIndexer = playerIndexers.get(0);
                        indexerName = playerIndexer.getIndexer().getName(); // Get the associated Indexer's name
                        value = String.valueOf(playerIndexer.getValue());  // Get the value from PlayerIndexer
                    }
            %>
            <tr>
                <th scope="row"><%= player.getPlayerId() %></th>
                <td><%= player.getName() %></td>
                <td><%= player.getFullName() %></td>
                <td><%= player.getAge() %></td>
                <td><%= indexerName %></td>
                <td><%= value %></td>
                <td>
                    <!-- Edit and Delete Buttons -->
                    <a href="/player-form?id=<%= player.getPlayerId() %>&name=<%= player.getName() %>&fullName=<%= player.getFullName() %>&age=<%= player.getAge() %>&value=<%= value %>"
                       class="btn btn-warning btn-sm">Edit</a>
                    <a href="/player?delete=<%= player.getPlayerId() %>" class="btn btn-danger btn-sm">Delete</a>
                </td>
            </tr>
            <% } %>
        </tbody>
    </table>
</div>
