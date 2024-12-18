import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Footer from '../Common/footer';
import Header from '../Common/header';

import './mypage.css';
/* import Footer from "../Common/footer";
import Header from "../Common/header"; */

const MyPage = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [foodPreferences, setFoodPreferences] = useState([]);
    const [rating, setRating] = useState(5);
    const [isNamePopupOpen, setIsNamePopupOpen] = useState(false);
    const [isFoodPopupOpen, setIsFoodPopupOpen] = useState(false);
    const [foodData, setFoodData] = useState({});

    const user = JSON.parse(sessionStorage.getItem('user'));

    // 서버에서 사용자 정보와 음식 데이터 가져오기
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // sessionStorage에서 토큰 및 사용자 ID 가져오기
                const token = sessionStorage.getItem('accessToken');

                if (!token || !user) {
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
                const userResponse = await axios.get(`/users/${user.id}`, config);

                setName(userResponse.data.name);
                setRating(userResponse.data.rating); // 기본값 설정
                // 프로필 이미지 설정


                // 선호 음식 데이터 설정
                const favoriteFoods = [];
                if (userResponse.data.food1) favoriteFoods.push(userResponse.data.food1);
                if (userResponse.data.food2) favoriteFoods.push(userResponse.data.food2);
                if (userResponse.data.food3) favoriteFoods.push(userResponse.data.food3);

                setFoodPreferences(favoriteFoods);
                setIsLoading(false);
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

    // 사용자 업데이트 API 요청
    const updateUser = async (user) => {
        try {
            // 업데이트 API 호출
            await axios.patch(`/users/${user.id}`, user);
        } catch (error) {
            console.error('사용자 업데이트 실패:', error.response?.data || error.message);
            alert('사용자 정보를 업데이트하는 중 오류가 발생했습니다.');
        }
    };

    // 선호 음식 저장
    const saveFoodPreferences = async () => {
        try {
            if (!user) {
                alert('로그인이 필요합니다.');
                navigate('/login'); // 로그인 페이지로 리다이렉트
                return;
            }

            user.food1 = foodPreferences[0] ? { id: foodPreferences[0].id } : null;
            user.food2 = foodPreferences[1] ? { id: foodPreferences[1].id } : null;
            user.food3 = foodPreferences[2] ? { id: foodPreferences[2].id } : null;

            // API 호출
            await updateUser(user);

            setIsFoodPopupOpen(false);
        } catch (error) {
            console.error('선호 음식 저장 실패:', error.response?.data || error.message);
            alert('선호 음식을 저장하는 중 오류가 발생했습니다.');
        }
    };

    // 이름 저장
    const saveName = async () => {
        try {
            if (!user) {
                alert('로그인이 필요합니다.');
                navigate('/login'); // 로그인 페이지로 리다이렉트
                return;
            }

            user.name = name;

            // API 호출
            await updateUser(user);

            setIsNamePopupOpen(false);
        } catch (error) {
            console.error('닉네임 저장 실패:', error);
            alert('닉네임 저장 중 오류가 발생했습니다.');
        }
    };

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

    const onClickLogout = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('accessToken');

        navigate('/login');
    }

    // 출력
    return (
        <div className="mypage-container">
            <Header />
            {isLoading ?
                <div class="is-loading">
                    <span>로딩 중...</span>
                </div>
                :
                <div>
                    <h2 className='mypage-title'>마이페이지</h2>
                    <p className='mypage-introduce'>안녕하세요, {name}님!</p>
                    <img
                        src="/chiikawa.jpeg" // public 디렉토리의 chiikawa.jpeg 이미지
                        alt="Profile"
                        className="profile-picture"
                    />

                    <div className="profile-score">{rating != 0 ?
                        `평가 점수: ${rating.toFixed(1)} / 5`
                        : `아직 평가가 없습니다.`}</div>
                    <button className="edit-button" onClick={() => setIsNamePopupOpen(true)}>닉네임 수정</button>

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

                    <button onClick={() => setIsFoodPopupOpen(true)} className="edit-button">선호 음식 수정</button>
                    <div className='logout-button' onClick={onClickLogout}>
                        로그아웃
                    </div>
                </div>
            }

            {/* 이름 수정 팝업 */}
            {
                isNamePopupOpen && (
                    <div className="popup-overlay">
                        <div className="name-popup-content">
                            <div className="edit-name-container">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="edit-name-input"
                                />
                            </div>
                            <button className="name-save-button" onClick={saveName} >저장</button>
                            <button className="name-close-button" onClick={() => setIsNamePopupOpen(false)}> 닫기</button>
                        </div>
                    </div>
                )
            }

            {/* 음식 수정 팝업 */}
            {
                isFoodPopupOpen && (
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
                            <button onClick={saveFoodPreferences} className="name-save-button">저장</button>
                            <button className="name-close-button" onClick={() => setIsFoodPopupOpen(false)}> 닫기</button>
                        </div>
                    </div>
                )
            }
            <Footer />
        </div >
    );
};

export default MyPage;