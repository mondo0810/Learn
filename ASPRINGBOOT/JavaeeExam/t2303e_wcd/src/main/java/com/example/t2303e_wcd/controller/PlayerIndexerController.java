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

@WebServlet("/player-indexer")
public class PlayerIndexerController extends HttpServlet {

    private PlayerIndexerRepository playerIndexerRepository = new PlayerIndexerRepository();
    private PlayerRepository playerRepository = new PlayerRepository();
    private IndexerRepository indexerRepository = new IndexerRepository();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String deleteId = request.getParameter("delete");
        if (deleteId != null) {
            try {
                playerIndexerRepository.delete(Integer.parseInt(deleteId));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        try {
            List<PlayerIndexer> playerIndexers = playerIndexerRepository.findAll();
            request.setAttribute("playerIndexers", playerIndexers);
            request.setAttribute("players", playerRepository.findAll());
            request.setAttribute("indexers", indexerRepository.findAll());
            request.getRequestDispatcher("player-indexer/player-indexer-list.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String idParam = request.getParameter("id");
        String playerIdParam = request.getParameter("playerId");
        String indexerIdParam = request.getParameter("indexerId");
        float value = Float.parseFloat(request.getParameter("value"));

        int id = idParam != null && !idParam.isEmpty() ? Integer.parseInt(idParam) : 0;
        int playerId = Integer.parseInt(playerIdParam);
        int indexerId = Integer.parseInt(indexerIdParam);

        Player player = playerRepository.findById(playerId);
        Indexer indexer = indexerRepository.findById(indexerId);

        PlayerIndexer playerIndexer = new PlayerIndexer(id, player, indexer, value);

        try {
            playerIndexerRepository.save(playerIndexer);
            response.sendRedirect("/player-indexer");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
