package com.example.t2303e_wcd.controller;

import com.example.t2303e_wcd.model.Indexer;
import com.example.t2303e_wcd.model.Player;
import com.example.t2303e_wcd.model.PlayerIndexer;
import com.example.t2303e_wcd.repository.IndexerRepository;
import com.example.t2303e_wcd.repository.PlayerIndexerRepository;
import com.example.t2303e_wcd.repository.PlayerRepository;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/player")
public class PlayerController extends HttpServlet {

    private PlayerRepository playerRepository = new PlayerRepository();
    private IndexerRepository indexerRepository = new IndexerRepository();  // New for accessing Indexers
    private PlayerIndexerRepository playerIndexerRepository = new PlayerIndexerRepository();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String deleteId = request.getParameter("delete");
        if (deleteId != null) {
            try {
                playerRepository.delete(Integer.parseInt(deleteId));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        try {
            List<Player> players = playerRepository.findAll();
            List<Indexer> indexers = indexerRepository.findAll();
            request.setAttribute("indexers", indexers);
            request.setAttribute("players", players);

            request.getRequestDispatcher("player/player-list.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String idParam = request.getParameter("id");
        String name = request.getParameter("name");
        String fullName = request.getParameter("fullName");
        String age = request.getParameter("age");

        // Getting the indexerId and value from the form
        String indexerIdParam = request.getParameter("indexerId");
        String valueParam = request.getParameter("value");

        int id = idParam != null && !idParam.isEmpty() ? Integer.parseInt(idParam) : 0;
        int indexerId = indexerIdParam != null ? Integer.parseInt(indexerIdParam) : 0;
        float value = valueParam != null ? Float.parseFloat(valueParam) : 0;

        // Retrieve the Indexer object from the database using the indexerId
        Indexer indexer = indexerRepository.findById(indexerId);

        // Fetch the PlayerIndexer list associated with the given indexerId
        List<PlayerIndexer> playerIndexers = playerIndexerRepository.findByIndexId(indexer.getIndexId());

        // If there are any playerIndexers, set the value
        if (!playerIndexers.isEmpty()) {
            PlayerIndexer playerIndexer = playerIndexers.get(0); // Get the first match
            playerIndexer.setValue(value); // Set the value for the PlayerIndexer
            System.out.println("Updating PlayerIndexer with value: " + value); // Debugging line
            playerIndexerRepository.save(playerIndexer); // Save the PlayerIndexer
        }

        // Create a Player object and associate the updated playerIndexers with it
        Player player = new Player(id, name, fullName, age, playerIndexers, indexer);

        try {
            playerRepository.save(player); // Save the player (and associated PlayerIndexer)
            System.out.println("Saving Player with ID: " + player.getPlayerId()); // Debugging line
            response.sendRedirect("/player");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
