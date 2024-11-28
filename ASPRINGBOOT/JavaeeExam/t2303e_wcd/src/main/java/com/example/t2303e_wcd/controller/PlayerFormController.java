package com.example.t2303e_wcd.controller;

import com.example.t2303e_wcd.model.Indexer;
import com.example.t2303e_wcd.model.Player;
import com.example.t2303e_wcd.repository.IndexerRepository;
import com.example.t2303e_wcd.repository.PlayerRepository;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/player-form")
public class PlayerFormController extends HttpServlet {

    private PlayerRepository playerRepository = new PlayerRepository();
    private IndexerRepository indexerRepository = new IndexerRepository();  // New for accessing Indexers

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String playerId = request.getParameter("id");
        List<Indexer> indexers = indexerRepository.findAll();

        if (playerId != null && !playerId.isEmpty()) {
            try {
                // Fetch the player by ID if editing
                Player player = playerRepository.findById(Integer.parseInt(playerId));
                request.setAttribute("player", player);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        // Set indexers in request attribute for the dropdown
        request.setAttribute("indexers", indexers);
        try {
            request.getRequestDispatcher("player/player-edit.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
