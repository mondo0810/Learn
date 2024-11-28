package com.example.t2303e_wcd.repository;

import com.example.t2303e_wcd.DTO.StudentResponse;
import com.example.t2303e_wcd.HibernateUtil;
import com.example.t2303e_wcd.model.Student;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;
import java.util.stream.Collectors;

public class StudentRepository implements IStudentRepository {

    @Override
    public List<StudentResponse> findAll(String searchParams) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            String hql = "FROM Student";
            List<Student> students;
            if (searchParams != null && !searchParams.isEmpty()) {
                hql += " WHERE name LIKE :searchParam";
                students = session.createQuery(hql, Student.class)
                        .setParameter("searchParam", "%" + searchParams + "%")
                        .getResultList();
            } else {
                students = session.createQuery(hql, Student.class).getResultList();
            }

            return students.stream().map(this::convertToResponse).collect(Collectors.toList());
        }
    }

    private StudentResponse convertToResponse(Student student) {
        StudentResponse response = new StudentResponse(
                student.getId(),
                student.getName(),
                student.getEmail(),
                student.getAddress(),
                student.getPhone(),
                student.getCreatedAt(),
                student.getClassRoom() != null ? student.getClassRoom().getName() : null,
                student.getClassRoom() != null ? student.getClassRoom().getId() : null,
                student.getSubjects()
        );
        return response;
    }

    @Override
    public boolean save(Student student) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            transaction = session.beginTransaction();
            session.saveOrUpdate(student);
            transaction.commit();
            return true;
        } catch (Exception e) {
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean delete(int id) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            transaction = session.beginTransaction();
            Student student = session.get(Student.class, id);
            if (student != null) {
                session.delete(student);
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
