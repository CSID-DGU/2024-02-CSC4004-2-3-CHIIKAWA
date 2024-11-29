import React, { useState, useRef, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Send from "@mui/icons-material/Send";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import "./chatroom.css";
import Footer from '../Common/footer';
import Header from '../Common/header';

const ChatRoom = () => {
  const [message, setMessage] = useState(""); // 메세지 입력창
  const [messages, setMessages] = useState([  // 화면에 표시되는 메세지들
    { id: 1, username: "name1", message: "Hi!" },
    { id: 2, username: "name2", message: "Hello." },
  ]);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);

  const chatBoxRef = useRef(null);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        username: "Me",
        message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
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
    { id: 1, groupName: "group1", icon: <GroupsIcon sx={{ fontSize: 30, color: "#666" }} /> },
    { id: 2, groupName: "group2", icon: <GroupsIcon sx={{ fontSize: 30, color: "#666" }} /> },
    { id: 3, groupName: "group3", icon: <GroupsIcon sx={{ fontSize: 30, color: "#666" }} /> },
  ];

  // 임시 멤버 데이터
  const memberList = [
    { id: 1, name: "name1", avatar: <AccountCircleOutlinedIcon sx={{ fontSize: 30, color: "#666" }} /> },
    { id: 2, name: "name2", avatar: <AccountCircleOutlinedIcon sx={{ fontSize: 30, color: "#666" }} /> },
    { id: 3, name: "name3", avatar: <AccountCircleOutlinedIcon sx={{ fontSize: 30, color: "#666" }} /> },
  ];

  // 상단 채팅방 이름
  const [roomName, setRoomName] = useState("채팅방 1");

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
            <div className="group-item" key={group.id}>
              <div className="group-icon">{group.icon}</div>
              <div className="group-name">{group.groupName}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={`right_sidebar ${isRightSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">참가 인원</div>
        </div>
        <div className="member-list">
          {memberList.map((member) => (
            <div className="member-item" key={member.id}>
              <div className="avatar">{member.avatar}</div>
              <div className="member-name">{member.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={`chat-box-container ${isRightSidebarOpen ? "right-sidebar-open" : ""} ${isLeftSidebarOpen ? "left-sidebar-open" : ""}`}>
        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((msg) => (
            <div className="chat-message-container" key={msg.id}>
              <div className="avatar-message">
                <AccountCircleOutlinedIcon sx={{ fontSize: 40, color: "#4caf50" }} />
              </div>
              <div className="message-content">
                <div className="username">{msg.username}</div>
                <div className="chat-message">
                  {msg.message}
                  <div className="message-time">{msg.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="message-input-container">
          <IconButton color="primary" component="label" className="icon-button">
            <PhotoCamera sx={{color: "#4caf50" }} />
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
            <Send sx={{color: "#4caf50" }} />
          </IconButton>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ChatRoom;
