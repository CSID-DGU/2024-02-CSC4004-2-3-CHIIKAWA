import React, { useState } from "react";
import "./openchat.css";
import Footer from '../Common/footer';

const OpenChat = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const chatRooms = [
    { id: 1, title: "치킨 좋아하는 사람들 모여라🍗", tags: "#치킨 #양념치킨 #치맥", members: 6, leader: "https://via.placeholder.com/40" },
    { id: 2, title: "짜장면 먹을 사람?🍜", tags: "#짜장면 #짬뽕 #중식", members: 4, leader: "https://via.placeholder.com/40" },
    { id: 3, title: "오늘 떡볶이 먹을래?🌶️", tags: "#떡볶이 #매운음식 #간식", members: 3, leader: "https://via.placeholder.com/40" },
  ];

  const filteredRooms = chatRooms.filter((room) =>
    room.title.includes(searchTerm)
  );

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="chat-list">
            {filteredRooms.map((room) => (
              <div key={room.id} className="chat-room">
                <div className="room-info">
                  <div>
                    <h3>{room.title}</h3>
                    <p>{room.tags}</p>
                    <span>{room.members}명</span>
                  </div>
                  <img className="profile-image" src={room.leader} alt="Room Leader" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OpenChat;
