import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./chatgroup.css";

const ChatGroup = ({ user, group, isCurRoom, onClick, onDisconnected }) => {
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [rating, setRating] = useState(0); // 현재 선택된 별점
    const [hoverRating, setHoverRating] = useState(0); // Hover 상태

    const onClickQuit = async () => {
        setIsPopupOpen(false);
        setIsRatingModalOpen(true); // 별점 모달 열기
    };

    const handleRatingSubmit = async () => {
        try {
            // 별점 제출 API 호출
            await axios.post(`/ratings`, {
                userId: user.id,
                groupId: group.id,
                rating,
            });

            // 채팅방 나가기 API 호출
            await axios.delete(`/chatparts/delete/${user.id}/${group.id}`);
            
            // 방 나가기 완료 처리
            setIsRatingModalOpen(false);
            window.location.replace("/chatroom");
            onDisconnected();
        } catch (error) {
            console.error("별점 제출 또는 방 나가기 중 오류 발생:", error);
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`star ${hoverRating >= i || rating >= i ? "selected" : ""}`}
                    onMouseOver={() => setHoverRating(i)}
                    onMouseOut={() => setHoverRating(0)}
                    onClick={() => setRating(i)}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className={`${isCurRoom ? "current-group-item" : "group-item"}`} key={group.id} onClick={onClick}>
            <div className="group-icon">{group.icon}</div>
            <div className="group-name">{group.name}</div>
            <button className="close-button" onClick={() => setIsPopupOpen(true)}>
                ×
            </button>
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3 className="group-name">{group.name}</h3>
                        <h3>채팅방을 정말로 나가시겠습니까?</h3>
                        <button onClick={onClickQuit} className="yes-button">
                            예
                        </button>
                        <button onClick={() => setIsPopupOpen(false)} className="no-button">
                            아니오
                        </button>
                    </div>
                </div>
            )}
            {isRatingModalOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>별점을 매겨주세요</h3>
                        <div className="rating-stars">{renderStars()}</div>
                        <p>현재 별점: {rating}점</p>
                        <div className="modal-actions">
                            <button onClick={handleRatingSubmit} className="yes-button">
                                제출
                            </button>
                            <button onClick={() => setIsRatingModalOpen(false)} className="no-button">
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatGroup;
