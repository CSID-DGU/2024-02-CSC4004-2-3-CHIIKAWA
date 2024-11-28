package com.chiikawa.ricefriend.data.entity;

import lombok.*;
import jakarta.persistence.*;

import java.io.Serializable;

@Getter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Entity
@Table(name = "chatpart")
@IdClass(ChatPartId.class)
public class ChatPart implements Serializable {
    @Id
    @JoinColumn(name="userid", referencedColumnName="id")
    private User user;

    @Id
    @JoinColumn(name="roomid", referencedColumnName="id")
    private ChatRoom chatroom;

    @Builder
    protected ChatPart(User user, ChatRoom chatroom) {
        this.user = user;
        this.chatroom = chatroom;
    }
}