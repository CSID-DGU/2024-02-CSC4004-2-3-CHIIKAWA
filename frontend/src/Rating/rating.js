import React, { useState } from 'react';
import './rating.css';
import { useNavigate } from 'react-router-dom';

function Rating() {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    const handleStarClick = (index) => {
        setRating(index);
        setFeedback(''); // 새로운 별 선택 시 입력 초기화
    };

    const handleSubmit = () => {
        console.log(`송지은님에게 준 점수: ${rating}점`);
        console.log(`피드백: ${feedback}`);
        window.location.replace('/chatroom');
        //navigate('/swipe'); // /swipe로 이동
    };

    return (
        <div className="rating-container">
            <div className="rating-box">
                <h2>송지은님의 밥친구 점수는?</h2>
                <div className="stars">
                    {[...Array(5)].map((_, index) => {
                        const starIndex = index + 1;
                        return (
                            <span
                                key={index}
                                className={`star ${rating >= starIndex ? 'filled' : ''}`}
                                onClick={() => handleStarClick(starIndex)}
                            >
                                ★
                            </span>
                        );
                    })}
                </div>
                {rating > 0 && (
                    <div className="feedback-container">
                        <p>
                            {rating <= 3
                                ? '어떤 점이 밥친구로서 부족한가요?'
                                : '어떤 점이 밥친구로서 만족스러웠나요?'}
                        </p>
                        <textarea
                            placeholder="피드백을 작성해주세요"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                    </div>
                )}
                <button className="submit-button" onClick={handleSubmit}>
                    확인
                </button>
            </div>
        </div>
    );
}

export default Rating;
