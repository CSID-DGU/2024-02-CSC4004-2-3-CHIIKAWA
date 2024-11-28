package com.chiikawa.ricefriend.data.dto;

import com.chiikawa.ricefriend.data.entity.*;
import com.chiikawa.ricefriend.model.MessageType;

import lombok.*;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.sql.Blob;

public class MessageDto {
    @Getter
    @Builder
    public static class MessageSaveDto{
        private int userid;
        private int roomid;
        private MessageType type;

        public Message toEntity(User user, ChatRoom chatroom) {
            return Message.builder()
                    .user(user)
                    .chatroom(chatroom)
                    .type(type)
                    .build();
        }
    }

    // ===================요청, 응답 구분선 ================

    @Getter
    @Builder
    @AllArgsConstructor
    public static class MessageResponseDto {
        @JsonInclude(JsonInclude.Include.NON_DEFAULT)
        private int id;
        @JsonInclude(JsonInclude.Include.NON_DEFAULT)
        private User user;
        @JsonInclude(JsonInclude.Include.NON_DEFAULT)
        private ChatRoom chatroom;
        @JsonInclude(JsonInclude.Include.NON_DEFAULT)
        private MessageType type;

        public MessageResponseDto(Message message) {
            this.id = message.getId();
            this.user = message.getUser();
            this.chatroom = message.getChatroom();
            this.type = message.getType();
        }
    }
}