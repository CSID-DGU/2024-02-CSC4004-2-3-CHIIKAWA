import React, { useState, useRef, useEffect } from "react";

import axios from 'axios';
import { Stomp, CompatClient } from '@stomp/stompjs';

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Send from "@mui/icons-material/Send";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupsIcon from "@mui/icons-material/Groups";

import ChatGroup from './ChatGroup/chatgroup';
import ChatMember from './ChatMember/chatmember';
import ChatMessage from './ChatMessage/chatmessage';
import Footer from '../Common/footer';
import Header from '../Common/header';

import "./chatroom.css";

const MessageType = {
  CHAT: "CHAT",
  JOIN: "JOIN",
  LEAVE: "LEAVE"
};

const ChatRoom = () => {
  const [message, setMessage] = useState(""); // 메세지 입력창
  const [messages, setMessages] = useState([  // 화면에 표시되는 메세지들
    { user: { id: 2, name: "name1" }, chatroom: { id: 1 }, type: MessageType.CHAT, detail: "Hi!", senttime: Date.now() },
    { user: { id: 3, name: "name2" }, chatroom: { id: 1 }, type: MessageType.CHAT, detail: "Hello.", senttime: Date.now() },
  ]);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);

  const chatBoxRef = useRef(null);
  const stompClient = useRef(null);

  // 유저id, 룸id 불러오기
  const curUser = JSON.parse(sessionStorage.getItem("user"));
  // const roomId = sessionStorage.getItem("roomId") || undefined;
  const chatRooms = JSON.parse(sessionStorage.getItem("chatrooms"));
  const [curRoom, setChatRoom] = useState(chatRooms[0] || undefined);
  // id로 가져와?

  console.log(curUser);

  const init = async () => {
    if(curRoom != undefined) {
      await checkMessageHistory();
      connect();
    }
  }

  useEffect(() => {
    init();
    // 컴포넌트 언마운트 시 웹소켓 연결 해제
    return () => disconnect();
  }, []);

  // 채팅 내역 조회하고 불러오기
  const checkMessageHistory = async () => {
    try {
      await axios.get("/messages/" + curRoom.id)
        .then(response => {
          response.data.forEach(msg => {
            setMessages((prevMessages) => [...prevMessages, msg])
          });
          // 나중에 이걸로 변경
          //setMessages(response.data);
        });
    } catch (error) {
      console.error('채팅 내역 불러오기 에러:', error);
    }
  };

  // 웹소켓 연결 설정
  const connect = () => {
    const socket = new WebSocket("ws://localhost:8080/ws");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, onConnected, onError);
  }
  // 웹소켓 연결 해제
  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };

  const onConnected = () => {
    // Subscribe to the Public Topic
    stompClient.current.subscribe(`/sub/chatroom/${curRoom.id}`, (msg) => {
      const newMessage = JSON.parse(msg.body);
      if (newMessage.type == MessageType.LEAVE) {
        newMessage.detail = `${newMessage.user.name}님이 퇴장하셨습니다.`;
      }
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    const joinMessage = {
      user: curUser,
      chatroom: curRoom,
      type: MessageType.JOIN,
      detail: curUser.name + "님이 입장하셨습니다."
    };

    // Tell your username to the server
    stompClient.current.send(`/pub/addUser`, {}, JSON.stringify(joinMessage));

    //setMessages((prevMessages) => [...prevMessages, joinMessage]);
  }

  function onError(error) {
    alert(error);
  }

  const sendMessage = async () => {
    if (message.trim() && stompClient.current) {
      const newMessage = {
        user: curUser,
        chatroom: curRoom,
        type: MessageType.CHAT,
        detail: message,
        senttime: Date.now()
      };
      try {
        // 전송 메세지 DB저장 api호출
        //await axios.post("/messages", newMessage);
        console.log(newMessage);
        stompClient.current.send(`/pub/message`, {}, JSON.stringify(newMessage));
        setMessage("");
      } catch (e) {
        // 실패 시 처리
        console.error(e);
      }
    }
  };

  // 전송버튼이 아닌 엔터를 눌러도 전송
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // 추가 메세지가 있으면 자동으로 스크롤을 제일 하단으로 내림
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // 임시 그룹 데이터
  const groupList = [
    { id: 1, name: "group1", icon: <GroupsIcon sx={{ fontSize: 30, color: "#666" }} /> },
    { id: 2, name: "group2", icon: <GroupsIcon sx={{ fontSize: 30, color: "#666" }} /> },
    { id: 3, name: "group3", icon: <GroupsIcon sx={{ fontSize: 30, color: "#666" }} /> },
  ];

  // 임시 멤버 데이터
  const memberList = [
    { id: 1, name: "name1", avatar: <AccountCircleOutlinedIcon sx={{ fontSize: 30, color: "#666" }} /> },
    { id: 2, name: "name2", avatar: <AccountCircleOutlinedIcon sx={{ fontSize: 30, color: "#666" }} /> },
    { id: 3, name: "name3", avatar: <AccountCircleOutlinedIcon sx={{ fontSize: 30, color: "#666" }} /> },
  ];

  // 상단 채팅방 이름
  const [roomName, setRoomName] = useState(curRoom?.name || "");

  return (
    <>
      {/* 공통 헤더 */}
      <Header />

      <div className="chat-room-container">
        {/* 기존의 ChatRoom 전용 헤더 */}
        <header>
          <IconButton color="primary" className="icon-button" onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)} sx={{ color: "#4caf50" }}>
            <ChatIcon />
          </IconButton>
          <div className="chat-room-title">{roomName}</div>
          <IconButton color="primary" className="icon-button" onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)} sx={{ color: "#4caf50" }}>
            <PeopleAltIcon />
          </IconButton>
        </header>

        <div className={`left_sidebar ${isLeftSidebarOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <div className="sidebar-title">채팅방 목록</div>
          </div>
          <div className="group-list">
            {groupList.map((group) => (
              <ChatGroup group={group} onClick={(e) => {
                console.log(e.target.value);
                setChatRoom(e.target.value);
              }} />
            ))}
          </div>
        </div>

        <div className={`right_sidebar ${isRightSidebarOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <div className="sidebar-title">참가 인원</div>
          </div>
          <div className="member-list">
            {memberList.map((member) => (
              <ChatMember member={member} />
            ))}
          </div>
        </div>

        <div className={`chat-box-container ${isRightSidebarOpen ? "right-sidebar-open" : ""} ${isLeftSidebarOpen ? "left-sidebar-open" : ""}`}>
          <div className="chat-box" ref={chatBoxRef}>
            {messages.map((msg) => (
              <ChatMessage msg={msg} isSender={curUser.id === msg.user.id} />
            ))}
          </div>

          <div className="message-input-container">
            <IconButton color="primary" component="label" className="icon-button">
              <PhotoCamera sx={{ color: "#4caf50" }} />
            </IconButton>
            <input
              type="text"
              className="input"
              placeholder="메시지를 입력하세요."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <IconButton color="primary" onClick={sendMessage} className="icon-button">
              <Send sx={{ color: "#4caf50" }} />
            </IconButton>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChatRoom;
