package com.chiikawa.ricefriend.service;

import java.util.List;
import java.util.stream.Collectors;

import com.chiikawa.ricefriend.data.dto.MessageDto;
import com.chiikawa.ricefriend.data.entity.Message;
import com.chiikawa.ricefriend.data.entity.User;
import com.chiikawa.ricefriend.data.entity.ChatRoom;
import com.chiikawa.ricefriend.data.repository.MessageRepository;
import com.chiikawa.ricefriend.data.repository.UserRepository;
import com.chiikawa.ricefriend.data.repository.ChatRoomRepository;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;
    private UserRepository userRepository;
    private ChatRoomRepository chatRoomRepository;

    public Message saveMessage(MessageDto.MessageSaveDto requestDto) {
        User user = userRepository.findById(requestDto.getUserid()).orElseThrow();
        ChatRoom chatroom = chatRoomRepository.findById(requestDto.getRoomid()).orElseThrow();

        Message message = requestDto.toEntity(user, chatroom);

        return messageRepository.save(message);
    }

    public List<MessageDto.MessageResponseDto> getAllMessages() {
        List<Message> messages = messageRepository.findAll();

        return messages.stream()
                .map(MessageDto.MessageResponseDto::new)
                .collect(Collectors.toList());
    }

    public List<MessageDto.MessageResponseDto> getMessagesByCompositeId(int userid, int roomid) {
        List<Message> messages = messageRepository.findByCompositeId(userid, roomid);

        return messages.stream()
                .map(MessageDto.MessageResponseDto::new)
                .collect(Collectors.toList());
    }

    public MessageDto.MessageResponseDto getMessageById(int id) {
        Message entity = messageRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 메세지가 없습니다. id=" + id));

        return new MessageDto.MessageResponseDto(entity);
    }

    public void deleteMessage(int id) {
        messageRepository.deleteById(id);
    }
}