package com.chiikawa.ricefriend.service;

import java.util.List;
import java.util.stream.Collectors;

import com.chiikawa.ricefriend.data.dto.UserDto;
import com.chiikawa.ricefriend.data.dto.ChatPartDto;

import com.chiikawa.ricefriend.data.entity.ChatPart;
import com.chiikawa.ricefriend.data.entity.ChatPartId;
import com.chiikawa.ricefriend.data.entity.User;
import com.chiikawa.ricefriend.data.entity.ChatRoom;

import com.chiikawa.ricefriend.data.repository.ChatPartRepository;
import com.chiikawa.ricefriend.data.repository.UserRepository;
import com.chiikawa.ricefriend.data.repository.ChatRoomRepository;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class ChatPartService {
    @Autowired
    private ChatPartRepository chatpartRepository;
    private UserRepository userRepository;
    private ChatRoomRepository chatRoomRepository;

    public ChatPart saveChatPart(ChatPartDto.ChatPartSaveDto requestDto) {
        User user = userRepository.findById(requestDto.getUserid()).orElseThrow();
        ChatRoom chatroom = chatRoomRepository.findById(requestDto.getRoomid()).orElseThrow();

        ChatPart chatpart = requestDto.toEntity(user, chatroom);

        return chatpartRepository.save(chatpart);
    }

    public List<ChatPartDto.ChatPartResponseDto> getAllChatParts() {
        List<ChatPart> chatparts = chatpartRepository.findAll();

        return chatparts.stream()
                .map(ChatPartDto.ChatPartResponseDto::new)
                .collect(Collectors.toList());
    }

    public ChatPartDto.ChatPartResponseDto getChatPartById(ChatPartId id) {
        ChatPart entity = chatpartRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 chatpart가 없습니다. id=" + id));

        return new ChatPartDto.ChatPartResponseDto(entity);
    }

    public ChatPartDto.ChatPartResponseDto getChatPartByCompositeId(int userid, int roomid) {
        ChatPart entity = chatpartRepository.findByCompositeId(userid, roomid)
                .orElseThrow(() -> new IllegalArgumentException("해당 chatpart가 없습니다."));

        return new ChatPartDto.ChatPartResponseDto(entity);
    }

    public void deleteChatPart(ChatPartId id) {
        chatpartRepository.deleteById(id);
    }

    public void deleteChatPart(int userid, int roomid) {
        chatpartRepository.deleteByCompositeId(userid, roomid);
    }
}