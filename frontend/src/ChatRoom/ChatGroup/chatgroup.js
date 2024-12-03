import React from "react";
import axios from "axios";

import "./chatgroup.css";

const ChatGroup = ({ user, group, isCurRoom, onClick }) => {
    const onClose = async() => {
        await axios.delete(`/delete/${user.id}/${group.id}`)
    }

    return (
        <div className={`${isCurRoom ? "current-group-item" : "group-item"}`} key={group.id} onClick={onClick}>
            <div className="group-icon">{group.icon}</div>
            <div className="group-name">{group.name}</div>
            <button className="close-button" onClick={(e) => { 
                e.stopPropagation(); // 클릭 이벤트가 부모로 전파되지 않도록 설정
                onClose(group.id); // 닫기 이벤트 호출
            }}>
                ×
            </button>
        </div>
    );
};

export default ChatGroup;