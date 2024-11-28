package com.chiikawa.ricefriend.data.repository;

import java.util.Optional;

import com.chiikawa.ricefriend.data.entity.ChatPart;
import com.chiikawa.ricefriend.data.entity.ChatPartId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChatPartRepository extends JpaRepository<ChatPart, ChatPartId> {
    @Query(value = "SELECT * FROM chatpart WHERE userid = ?1 AND roomid = ?2", nativeQuery = true)
    Optional<ChatPart> findByCompositeId(int userid, int roomid);

    @Query(value = "DELETE FROM chatpart WHERE userid = ?1 AND roomid = ?2", nativeQuery = true)
    void deleteByCompositeId(int userid, int roomid);
}