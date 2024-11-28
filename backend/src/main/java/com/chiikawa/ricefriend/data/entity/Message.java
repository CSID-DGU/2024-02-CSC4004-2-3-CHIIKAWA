package com.chiikawa.ricefriend.data.entity;

import com.chiikawa.ricefriend.model.MessageType;

import lombok.*;
import jakarta.persistence.*;

import java.io.Serializable;

@Getter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Entity
@Table(name = "message")
public class Message implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)// auto_increment
    private int id;

    @JoinColumn(name="userid", referencedColumnName="id")
    private User user;

    @JoinColumn(name="roomid", referencedColumnName="id")
    private ChatRoom chatroom;

    @Column(columnDefinition = "ENUM('CHAT', 'JOIN', 'LEAVE')")
    @Enumerated(EnumType.STRING)
    private MessageType type;

    @Builder
    protected Message(User user, ChatRoom chatroom, MessageType type) {
        this.user = user;
        this.chatroom = chatroom;
        this.type = type;
    }
}