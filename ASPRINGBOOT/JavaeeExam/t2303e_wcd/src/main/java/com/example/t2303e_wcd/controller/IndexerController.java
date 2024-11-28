package com.example.t2303e_wcd.controller;

import com.example.t2303e_wcd.model.Indexer;
import com.example.t2303e_wcd.repository.IndexerRepository;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/indexer")
public class IndexerController extends HttpServlet {

    private IndexerRepository indexerRepository = new IndexerRepository();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String deleteId = request.getParameter("delete");
        if (deleteId != null) {
            try {
                indexerRepository.delete(Integer.parseInt(deleteId));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        try {
            List<Indexer> indexers = indexerRepository.findAll();
            request.setAttribute("indexers", indexers);
            request.getRequestDispatcher("indexer/indexer-list.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String idParam = request.getParameter("id");
        String name = request.getParameter("name");
        float valueMin = Float.parseFloat(request.getParameter("valueMin"));
        float valueMax = Float.parseFloat(request.getParameter("valueMax"));

        int id = idParam != null && !idParam.isEmpty() ? Integer.parseInt(idParam) : 0;

        Indexer indexer = new Indexer(id, name, valueMin, valueMax, null, null);

        try {
            indexerRepository.save(indexer);
            response.sendRedirect("/indexer");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
