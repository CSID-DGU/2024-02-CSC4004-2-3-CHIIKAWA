package com.chiikawa.ricefriend.service;

import java.util.List;
import java.util.stream.Collectors;

import com.chiikawa.ricefriend.data.dto.ChatRoomDto;
import com.chiikawa.ricefriend.data.dto.UserDto;
import com.chiikawa.ricefriend.data.entity.ChatRoom;
import com.chiikawa.ricefriend.data.entity.User;
import com.chiikawa.ricefriend.data.repository.ChatRoomRepository;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class ChatRoomService {
    @Autowired
    private ChatRoomRepository chatroomRepository;

    public ChatRoom saveChatRoom(ChatRoomDto.ChatRoomSaveDto requestDto) {
        ChatRoom chatroom = requestDto.toEntity();

        return chatroomRepository.save(chatroom);
    }

    public void updateChatRoom(int id, ChatRoomDto.ChatRoomUpdateDto requestDto) {
        ChatRoom chatroom = chatroomRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("id = "+ id + " 채팅방이 없습니다."));

        chatroom.update(requestDto.getName()
                , requestDto.getState()
                , requestDto.getLimitednum());
    }

    public List<ChatRoomDto.ChatRoomResponseDto> getAllChatRooms() {
        List<ChatRoom> chatrooms = chatroomRepository.findAll();

        return chatrooms.stream()
                .map(ChatRoomDto.ChatRoomResponseDto::new)
                .collect(Collectors.toList());
    }

    public ChatRoomDto.ChatRoomResponseDto getChatRoomById(int id) {
        ChatRoom entity = chatroomRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 채팅방이 없습니다. id=" + id));

        return new ChatRoomDto.ChatRoomResponseDto(entity);
    }

    public void deleteChatRoom(int id) {
        chatroomRepository.deleteById(id);
    }
}