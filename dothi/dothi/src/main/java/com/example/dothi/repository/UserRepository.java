package com.example.dothi.repository;

import com.example.dothi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE " +
            "(:searchParams IS NULL OR :searchParams = '' OR " +
            "LOWER(u.name) LIKE LOWER(CONCAT('%', :searchParams, '%')) OR " +
            "CAST(u.age AS string) LIKE CONCAT('%', :searchParams, '%') OR " +
            "EXISTS (SELECT r FROM u.roles r WHERE LOWER(r.name) LIKE LOWER(CONCAT('%', :searchParams, '%'))))")
    List<User> searchByParams(@Param("searchParams") String searchParams);
}
