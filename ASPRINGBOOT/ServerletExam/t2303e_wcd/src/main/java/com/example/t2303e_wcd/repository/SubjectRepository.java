package com.example.t2303e_wcd.repository;

import com.example.t2303e_wcd.HibernateUtil;
import com.example.t2303e_wcd.model.Subject;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class SubjectRepository {

    public List<Subject> findAll() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            String hql = "FROM Subject";
            return session.createQuery(hql, Subject.class).getResultList();
        }
    }

    public Subject findById(int id) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.get(Subject.class, id);
        }
    }

    public boolean save(Subject subject) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            transaction = session.beginTransaction();
            session.saveOrUpdate(subject);
            transaction.commit();
            return true;
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
            return false;
        }
    }

    public boolean delete(int id) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            transaction = session.beginTransaction();
            Subject subject = session.get(Subject.class, id);
            if (subject != null) {
                session.delete(subject);
                transaction.commit();
                return true;
            }
            return false;
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
            return false;
        }
    }
}
