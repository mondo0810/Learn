package com.example.t2303e_wcd.repository;

import com.example.t2303e_wcd.HibernateUtil;
import com.example.t2303e_wcd.model.Indexer;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class IndexerRepository {

    // Method to get all indexers
    public List<Indexer> findAll() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            String hql = "FROM Indexer";  // HQL to retrieve all indexers
            return session.createQuery(hql, Indexer.class).getResultList();
        }
    }

    // Method to get an indexer by ID
    public Indexer findById(int id) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.get(Indexer.class, id);  // Retrieve indexer by ID
        }
    }

    // Method to save or update an indexer
    public boolean save(Indexer indexer) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            transaction = session.beginTransaction();
            session.saveOrUpdate(indexer);  // Save or update the indexer object
            transaction.commit();
            return true;
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();  // Rollback in case of error
            e.printStackTrace();
            return false;
        }
    }

    // Method to delete an indexer by ID
    public boolean delete(int id) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            transaction = session.beginTransaction();
            Indexer indexer = session.get(Indexer.class, id);
            if (indexer != null) {
                session.delete(indexer);  // Delete the indexer object
                transaction.commit();
                return true;
            }
            return false;  // Indexer not found
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();  // Rollback in case of error
            e.printStackTrace();
            return false;
        }
    }
}
