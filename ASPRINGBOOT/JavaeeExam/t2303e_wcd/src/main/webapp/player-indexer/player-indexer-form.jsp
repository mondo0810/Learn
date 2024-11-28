<%@ page import="com.example.t2303e_wcd.model.Player, com.example.t2303e_wcd.model.Indexer" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="container">
    <h1><%= (request.getParameter("id") != null) ? "Edit Player Indexer" : "Add New Player Indexer" %></h1>

    <form action="/player-indexer" method="post">
        <div class="mb-3">
            <label for="playerId" class="form-label">Player</label>
            <select class="form-control" id="playerId" name="playerId" required>
                <%
                    List<Player> players = (List<Player>) request.getAttribute("players");
                    for (Player player : players) {
                %>
                    <option value="<%= player.getPlayerId() %>"
                            <%= (request.getParameter("playerId") != null && request.getParameter("playerId").equals(String.valueOf(player.getPlayerId()))) ? "selected" : "" %>>
                        <%= player.getName() %>
                    </option>
                <% } %>
            </select>
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
        <a href="/player-indexer" class="btn btn-secondary">Cancel</a>
    </form>
</div>
