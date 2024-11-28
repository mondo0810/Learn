package com.example.t2303e_wcd.repository;

import com.example.t2303e_wcd.HibernateUtil;
import com.example.t2303e_wcd.model.ClassRoom;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class ClassRoomRepository {

    public List<ClassRoom> findAll() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("FROM ClassRoom", ClassRoom.class).getResultList();
        }
    }

    public boolean save(ClassRoom classRoom) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            transaction = session.beginTransaction();
            session.saveOrUpdate(classRoom);
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
            ClassRoom classRoom = session.get(ClassRoom.class, id);
            if (classRoom != null) {
                session.delete(classRoom);
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
