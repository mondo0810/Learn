package com.example.t2303e_wcd.repository;

import com.example.t2303e_wcd.HibernateUtil;
import com.example.t2303e_wcd.model.Indexer;
import com.example.t2303e_wcd.model.PlayerIndexer;
import com.example.t2303e_wcd.model.Player;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class PlayerIndexerRepository {

    // Method to get all PlayerIndexer records
    public List<PlayerIndexer> findAll() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            String hql = "FROM PlayerIndexer";
            return session.createQuery(hql, PlayerIndexer.class).getResultList();
        }
    }

    // Method to get a PlayerIndexer by ID
    public PlayerIndexer findById(int id) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.get(PlayerIndexer.class, id);
        }
    }


    // Method to get a list of PlayerIndexer records by indexId
    public List<PlayerIndexer> findByIndexId(int indexId) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            String hql = "FROM PlayerIndexer pi WHERE pi.indexer.indexId = :indexId";
            return session.createQuery(hql, PlayerIndexer.class)
                    .setParameter("indexId", indexId)
                    .getResultList();
        }
    }

    // Method to find a PlayerIndexer by Player and Indexer
    public PlayerIndexer findByPlayerAndIndexer(Player player, Indexer indexer) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            String hql = "FROM PlayerIndexer pi WHERE pi.player = :player AND pi.indexer = :indexer";
            return session.createQuery(hql, PlayerIndexer.class)
                    .setParameter("player", player)
                    .setParameter("indexer", indexer)
                    .uniqueResult();  // Return a single result
        } catch (Exception e) {
            e.printStackTrace();
            return null;  // Return null if any exception occurs
        }
    }


    // Method to save or update a PlayerIndexer
    public boolean save(PlayerIndexer playerIndexer) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            transaction = session.beginTransaction();
            session.saveOrUpdate(playerIndexer);  // Save or update the PlayerIndexer object
            transaction.commit();
            return true;
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
            return false;
        }
    }

    // Method to delete a PlayerIndexer by ID
    public boolean delete(int id) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            transaction = session.beginTransaction();
            PlayerIndexer playerIndexer = session.get(PlayerIndexer.class, id);
            if (playerIndexer != null) {
                session.delete(playerIndexer);  // Delete the PlayerIndexer object
                transaction.commit();
                return true;
            }
            return false;  // PlayerIndexer not found
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
            return false;
        }
    }
}
