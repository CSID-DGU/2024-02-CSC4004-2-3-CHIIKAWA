import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [foodPreferences, setFoodPreferences] = useState([]);
    const [profileImage, setProfileImage] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();
    const dummyFoodData = {
        분식: [
            { id: 1, name: '떡볶이' },
            { id: 2, name: '순대' },
            { id: 3, name: '튀김' },
        ],
        양식: [
            { id: 4, name: '피자' },
            { id: 5, name: '파스타' },
            { id: 6, name: '스테이크' },
        ],
        한식: [
            { id: 7, name: '불고기' },
            { id: 8, name: '비빔밥' },
            { id: 9, name: '김치찌개' },
        ],
    };

    const handleFoodSelection = (food) => {
        if (foodPreferences.find((item) => item.id === food.id)) {
            // 이미 선택된 음식이면 제거
            setFoodPreferences(foodPreferences.filter((item) => item.id !== food.id));
        } else if (foodPreferences.length < 3) {
            // 최대 3개까지 선택 가능
            setFoodPreferences([...foodPreferences, food]);
        } else {
            alert('최대 3개의 음식을 선택할 수 있습니다.');
        }
    };


    const handleProfileImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (foodPreferences.length === 0) {
            alert('최소 1개의 음식을 선택해야 합니다.');
            return;
        }

        const requestBody = {
            email,
            password,
            name,
            state: '활동 중',
            profileimg: profileImage ? profileImage.name : null,
            food1: foodPreferences[0] ? foodPreferences[0].id : null,
            food2: foodPreferences[1] ? foodPreferences[1].id : null,
            food3: foodPreferences[2] ? foodPreferences[2].id : null,
        };


        console.log('요청 Body:', requestBody);

        try {
            const response = await axios.post('/users', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('회원가입 성공:', response.data);
            navigate('/swipe');
        } catch (error) {
            console.error('회원가입 실패:', error);
            alert('회원가입 실패: 서버 오류');
        }
    };


    return (
        <div className="register-container">
            <h2 className="register-title">회원가입</h2>
            <p className="register-subtitle">밥친구와 함께할 준비가 되셨나요?</p>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="register-input-container">
                    <span className="register-icon">📧</span>
                    <input
                        type="email"
                        className="register-input"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="register-input-container">
                    <span className="register-icon">🔒</span>
                    <input
                        type="password"
                        className="register-input"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="register-input-container">
                    <span className="register-icon">🔒</span>
                    <input
                        type="password"
                        className="register-input"
                        placeholder="비밀번호를 다시 입력하세요"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="register-input-container">
                    <span className="register-icon">👤</span>
                    <input
                        type="text"
                        className="register-input"
                        placeholder="닉네임을 입력하세요"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="register-input-container">
                    <span className="register-icon">🍴</span>
                    <input
                        type="text"
                        className="register-input"
                        placeholder="선호 음식을 선택하세요"
                        value={foodPreferences.map(item => item.name).join(', ')} // 음식 이름만 표시
                        onClick={() => setIsPopupOpen(true)}
                        readOnly
                    />

                </div>
                <div className="register-input-container">
                    <label className="register-icon">📷</label>
                    <input
                        type="file"
                        className="register-input"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                    />
                </div>
                <button type="submit" className="register-button">
                    회원가입
                </button>
            </form>

            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>선호 음식을 선택하세요 (최대 3개)</h3>
                        {Object.entries(dummyFoodData).map(([category, foods]) => (
                            <div key={category}>
                                <h4 className="category-title">{category}</h4>
                                {foods.map((food) => (
                                    <button
                                        key={food.id}
                                        className={`option-button ${foodPreferences.find((item) => item.id === food.id) ? 'selected' : ''
                                            }`}
                                        onClick={() => handleFoodSelection(food)}
                                    >
                                        {food.name}
                                    </button>
                                ))}
                            </div>
                        ))}

                        <button
                            onClick={() => setIsPopupOpen(false)}
                            className="confirm-button"
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Register;
