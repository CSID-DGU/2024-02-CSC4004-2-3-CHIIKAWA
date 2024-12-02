import React from "react";
import { useNavigate } from 'react-router-dom';

import "./chatgroup.css";

const ChatGroup = ({ group }) => {
    const navigate = useNavigate();

    const onClickGroup = () => {
        // 그룹 클릭 시, 실행되는 코드
        console.log(`Group${group.id} Clicked!`);
        navigate("/chatroom");
    };

    return (
        <div className="group-item" key={group.id} onClick={onClickGroup}>
            <div className="group-icon">{group.icon}</div>
            <div className="group-name">{group.name}</div>
        </div>
    );
};

export default ChatGroup;