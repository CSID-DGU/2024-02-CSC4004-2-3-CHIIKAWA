import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './mypage.css';
/* import Footer from "../Common/footer";
import Header from "../Common/header"; */

const MyPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [foodPreferences, setFoodPreferences] = useState([]);
    const [profileScore, setProfileScore] = useState(4.5);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [foodData, setFoodData] = useState({});
    const [isEditingName, setIsEditingName] = useState(false);


    // 서버에서 사용자 정보와 음식 데이터 가져오기
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // sessionStorage에서 토큰 및 사용자 ID 가져오기
                const token = sessionStorage.getItem('accessToken');
                const userId = JSON.parse(sessionStorage.getItem('user'))?.id; // 로그인 시 저장된 사용자 ID
    
                if (!token || !userId) {
                    alert('로그인이 필요합니다.');
                    navigate('/login'); // 로그인 페이지로 리다이렉트
                    return;
                }
    
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
                    },
                };
    
                // 사용자 정보 가져오기
                const userResponse = await axios.get(`/users/${userId}`, config);
    
                console.log('사용자 정보:', userResponse.data);
                setName(userResponse.data.name);
                setProfileScore(userResponse.data.profileScore || 4.5); // 기본값 설정
    
                // 선호 음식 데이터 설정
                const favoriteFoods = [];
                if (userResponse.data.food1) favoriteFoods.push(userResponse.data.food1);
                if (userResponse.data.food2) favoriteFoods.push(userResponse.data.food2);
                if (userResponse.data.food3) favoriteFoods.push(userResponse.data.food3);
    
                setFoodPreferences(favoriteFoods);
            } catch (error) {
                console.error('사용자 정보 가져오기 실패:', error.response?.data || error.message);
                alert('사용자 정보를 불러오는 중 오류가 발생했습니다.');
                navigate('/login'); // 오류 발생 시 로그인 페이지로 리다이렉트
            }
        };
    
        fetchUserData();
    
        // 음식 데이터 가져오기
        const fetchFoodData = async () => {
            try {
                const [menuResponse, foodResponse] = await Promise.all([
                    axios.get('/menus'), // 메뉴 데이터
                    axios.get('/food')  // 음식 데이터
                ]);
    
                console.log('메뉴 데이터:', menuResponse.data);
                console.log('음식 데이터:', foodResponse.data);
    
                const menuMap = menuResponse.data.reduce((acc, menu) => {
                    acc[menu.id] = menu.name;
                    return acc;
                }, {});
    
                const groupedFoodData = foodResponse.data.reduce((acc, food) => {
                    const categoryName = menuMap[food.menu.id] || `카테고리 ${food.menu.id}`;
                    if (!acc[categoryName]) {
                        acc[categoryName] = [];
                    }
                    acc[categoryName].push(food);
                    return acc;
                }, {});
    
                setFoodData(groupedFoodData);
            } catch (error) {
                console.error('데이터 가져오기 실패:', error);
                alert('음식 및 메뉴 데이터를 불러오는 중 오류가 발생했습니다.');
            }
        };
    
        fetchFoodData();
    }, [navigate]);
    

    // 음식 선택 핸들러
    const handleFoodSelection = (food) => {
        if (foodPreferences.find((item) => item.id === food.id)) {
            setFoodPreferences(foodPreferences.filter((item) => item.id !== food.id));
        } else if (foodPreferences.length < 3) {
            setFoodPreferences([...foodPreferences, food]);
        } else {
            alert('최대 3개의 음식을 선택할 수 있습니다.');
        }
    };

    // 선호 음식 저장
    const saveFoodPreferences = async () => {
        try {
            const userId = JSON.parse(sessionStorage.getItem('user'))?.id; // 사용자 ID 가져오기
            if (!userId) {
                alert('로그인이 필요합니다.');
                navigate('/login'); // 로그인 페이지로 리다이렉트
                return;
            }
    
            const token = sessionStorage.getItem('accessToken'); // 토큰 가져오기
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // 인증 헤더 추가
                },
            };
    
            // 선호 음식 저장 API 호출
            await axios.patch(`/users/${userId}`, {
                foodPreferences: foodPreferences.map((food) => food.id), // 음식 ID 배열로 전송
            }, config);
    
            setIsPopupOpen(false);
            alert('선호 음식이 저장되었습니다.');
        } catch (error) {
            console.error('선호 음식 저장 실패:', error.response?.data || error.message);
            alert('선호 음식을 저장하는 중 오류가 발생했습니다.');
        }
    };    

    const saveName = async () => {
        try {
            await axios.put('/api/user/profile', { name });
            setIsEditingName(false); // 수정 모드 비활성화
            alert('닉네임이 저장되었습니다.');
        } catch (error) {
            console.error('닉네임 저장 실패:', error);
            alert('닉네임 저장 중 오류가 발생했습니다.');
        }
    };
    

    return (
        <div className="mypage-container">
            <h2 className='mypage-title'>마이페이지</h2>
            <p className='mypage-introduce'>안녕하세요, {name}님!</p>
            <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className="profile-picture"
                />
            <div className="profile-score">평가 점수: {profileScore.toFixed(1)} / 5</div>
            {isEditingName && (
                    <div className="edit-name-container">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="edit-name-input"
                        />
                        <button onClick={saveName} className="confirm-button">저장</button>
                        <button onClick={() => setIsEditingName(false)} className="cancel-button">취소</button>
                    </div>
                )}
            <button onClick={() => setIsEditingName(true)} className="edit-button">닉네임 수정</button>
                
            <h3 className='mypage-favfood'>선호 음식</h3>
            <div>
                {foodPreferences.length > 0 ? (
                    foodPreferences.map((food) => (
                        <span key={food.id} className="preference-badge">{food.name}</span>
                    ))
                ) : (
                    <p>선호 음식을 선택하지 않았습니다.</p>
                )}
            </div>
            
            <button onClick={() => setIsPopupOpen(true)} className="edit-button">선호 음식 수정</button>

            {/* 팝업 */}
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3 className='mypage-popuptitle'>선호 음식을 선택하세요 (최대 3개)</h3>
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
                        <button onClick={saveFoodPreferences} className="confirm-button">저장</button>
                        <button onClick={() => setIsPopupOpen(false)} className="cancel-button">닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPage;
