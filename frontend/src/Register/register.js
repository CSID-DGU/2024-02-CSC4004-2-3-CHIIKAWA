import React, { useState, useEffect } from 'react';
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
    const [foodData, setFoodData] = useState({}); // 음식 데이터를 저장할 상태
    const navigate = useNavigate();

    // 서버에서 음식 데이터를 가져오기
    useEffect(() => {
        const fetchFoodData = async () => {
            try {
                // 메뉴와 음식 데이터를 병렬로 가져옴
                const [menuResponse, foodResponse] = await Promise.all([
                    axios.get('/menus'), // 메뉴 데이터
                    axios.get('/food')  // 음식 데이터
                ]);

                console.log('메뉴 데이터:', menuResponse.data);
                console.log('음식 데이터:', foodResponse.data);

                // 메뉴 데이터를 맵으로 변환 (id -> name)
                const menuMap = menuResponse.data.reduce((acc, menu) => {
                    acc[menu.id] = menu.name; // id를 키로, name을 값으로 설정
                    return acc;
                }, {});

                // 음식 데이터를 카테고리별로 그룹화
                const groupedFoodData = foodResponse.data.reduce((acc, food) => {
                    const categoryName = menuMap[food.menu.id] || `카테고리 ${food.menu.id}`; // menu.id로 카테고리 이름 가져오기
                    if (!acc[categoryName]) {
                        acc[categoryName] = [];
                    }
                    acc[categoryName].push(food);
                    return acc;
                }, {});

                console.log('그룹화된 음식 데이터:', groupedFoodData);
                setFoodData(groupedFoodData); // 상태 업데이트
            } catch (error) {
                console.error('데이터 가져오기 실패:', error);
                alert('음식 및 메뉴 데이터를 불러오는 중 오류가 발생했습니다.');
            }
        };

        fetchFoodData();
    }, []);



    const handleFoodSelection = (food) => {
        if (foodPreferences.find((item) => item.id === food.id)) {
            setFoodPreferences(foodPreferences.filter((item) => item.id !== food.id));
        } else if (foodPreferences.length < 3) {
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
            name,
            email,
            password,
            state: '활동 중',
            food1: foodPreferences[0] ? { id: foodPreferences[0].id } : null,
            food2: foodPreferences[1] ? { id: foodPreferences[1].id } : null,
            food3: foodPreferences[2] ? { id: foodPreferences[2].id } : null,
        };

        console.log('요청 Body:', requestBody);

        try {
            const response = await axios.post('/users', requestBody);
            console.log('회원가입 성공:', response.data);
            navigate('/login');
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
                        value={foodPreferences.map(item => item.name).join(', ')}
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
                        {Object.entries(foodData).map(([categoryName, foods]) => (
                            <div key={categoryName}>
                                <h4 className="category-title">{categoryName}</h4>
                                {foods.map((food) => (
                                    <button
                                        key={food.id}
                                        className={`option-button ${foodPreferences.find((item) => item.id === food.id) ? 'selected' : ''}`}
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
