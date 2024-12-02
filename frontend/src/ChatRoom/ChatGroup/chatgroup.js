import React from "react";
import "./chatgroup.css";

const ChatGroup = ({ group }) => {
    const onClickGroup = () => {
        // 그룹 클릭 시, 실행되는 코드
        console.log(`Group${group.id} Clicked!`);
    };

    return (
        <div className="group-item" key={group.id} onClick={onClickGroup}>
            <div className="group-icon">{group.icon}</div>
            <div className="group-name">{group.name}</div>
        </div>
    );
};

export default ChatGroup;