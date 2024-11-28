package com.chiikawa.ricefriend.data.repository;

import com.chiikawa.ricefriend.data.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {
}