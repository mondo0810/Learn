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
        try {
            // Retrieve and validate form data
            String idParam = request.getParameter("id");
            String name = request.getParameter("name");
            String fullName = request.getParameter("fullName");
            String age = request.getParameter("age");
            String indexerIdParam = request.getParameter("indexerId");
            String valueParam = request.getParameter("value");

            if (indexerIdParam == null || indexerIdParam.isEmpty()) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Indexer ID is required.");
                return;
            }

            int id = idParam != null && !idParam.isEmpty() ? Integer.parseInt(idParam) : 0;
            int indexerId = Integer.parseInt(indexerIdParam);
            float value = valueParam != null ? Float.parseFloat(valueParam) : 0;

            // Fetch Indexer from the database
            Indexer indexer = indexerRepository.findById(indexerId);
            if (indexer == null) {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Indexer not found.");
                return;
            }

            // Fetch Player if exists, or create new one
            Player player = id > 0 ? playerRepository.findById(id) : null;
            if (player != null) {
                // Update existing Player
                player.setName(name);
                player.setFullName(fullName);
                player.setAge(age);
                player.setIndexer(indexer);
            } else {
                // Create new Player
                player = new Player(id, name, fullName, age, null, indexer);
            }
            playerRepository.save(player);

            // Check if PlayerIndexer exists
            PlayerIndexer playerIndexer = playerIndexerRepository.findByPlayerAndIndexer(player, indexer);
            if (playerIndexer != null) {
                // Update existing PlayerIndexer
                playerIndexer.setValue(value);
            } else {
                // Create new PlayerIndexer
                playerIndexer = PlayerIndexer.builder()
                        .player(player)
                        .indexer(indexer)
                        .value(value)
                        .build();
            }
            playerIndexerRepository.save(playerIndexer);

            response.sendRedirect("/player");

        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid number format.");
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "An error occurred.");
        }
    }




}
