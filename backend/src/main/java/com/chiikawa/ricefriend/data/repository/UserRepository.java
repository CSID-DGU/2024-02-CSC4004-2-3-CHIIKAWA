package com.chiikawa.ricefriend.data.repository;

import java.util.List;
import java.util.Optional;

import com.chiikawa.ricefriend.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query(value = "SELECT * FROM user WHERE email = ?1", nativeQuery = true)
    Optional<User> findByEmail(String email);

    @Query(value = "SELECT * FROM user u JOIN chatpart c ON u.id = c.userid WHERE roomid = ?1", nativeQuery = true)
    List<User> findAllByRoomid(int roomid);
}