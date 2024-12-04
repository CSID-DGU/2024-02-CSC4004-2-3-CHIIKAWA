import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import "./openchat.css";
import Footer from "../Common/footer";
import Header from "../Common/header";

const OpenChat = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [chatRooms, setChatRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({ name: "", limitednum: 2, state: "모집 중" });
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    setUserId(storedUser.id);
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get("/chatrooms");
        const mappedData = response.data.map((room) => ({
          id: room.id,
          title: room.name,
          state: room.state,
          members: room.limitednum,
        }));
        setChatRooms(mappedData);
        setIsLoading(false);
      } catch (error) {
        console.error("채팅방 데이터를 불러오는 중 오류가 발생했습니다.", error);
        setChatRooms([]);
        setIsLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setIsJoinModalOpen(true);
  };

  const handleJoinRoom = async () => {
    if (!userId) {
      alert("로그인된 사용자만 참여할 수 있습니다.");
      return;
    }

    try {
      const responseData = await axios.post(`/chatparts?userid=${userId}&roomid=${selectedRoom.id}`);

      console.log(responseData.data);
      setIsJoinModalOpen(false);

      sessionStorage.setItem('enterflag', "JOIN");
      navigate(`/chatroom`, { state: { room: selectedRoom } });
    } catch (error) {
      console.error("채팅방에 참여하는 중 오류가 발생했습니다.", error);
    }
  };  

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post("/chatrooms", newRoom);
      setChatRooms([...chatRooms, { id: response.data.id, ...newRoom }]);
      setNewRoom({ name: "", state: "모집 중", limitednum: 1 });
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("방 생성 중 오류가 발생했습니다.", error);
    }
  };

  const filteredRooms = chatRooms.filter((room) =>
    room.title?.includes(searchTerm)
  );

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => setIsCreateModalOpen(true)}>방 만들기</button>
          </div>
          <div className="chat-list">
            {isLoading ? (
              <p>로딩 중...</p>
            ) : filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <div
                  key={room.id}
                  className="chat-room"
                  onClick={() => handleRoomClick(room)}
                >
                  <div className="room-info">
                    <div>
                      <h3>{room.title}</h3>
                      <p>상태: {room.state}</p>
                      <span>정원: {room.members}명</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </div>
        </div>

        {isCreateModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>새 방 만들기</h2>
              <input
                type="text"
                placeholder="방 이름을 입력하세요"
                value={newRoom.name}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, name: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="정원"
                value={newRoom.limitednum}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, limitednum: parseInt(e.target.value) })
                }
              />
              <button onClick={handleCreateRoom}>생성</button>
              <button onClick={() => setIsCreateModalOpen(false)}>취소</button>
            </div>
          </div>
        )}

        {isJoinModalOpen && selectedRoom && (
          <div className="modal">
            <div className="modal-content">
              <h2>{selectedRoom.title}</h2>
              <p>상태: {selectedRoom.state}</p>
              <p>정원: {selectedRoom.members}명</p>
              <button onClick={handleJoinRoom}>참가</button>
              <button onClick={() => setIsJoinModalOpen(false)}>닫기</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OpenChat;
