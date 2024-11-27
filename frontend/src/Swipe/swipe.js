import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import confetti from 'canvas-confetti';
import './swipe.css'; // CSS 파일
import '../common.css';
import Footer from '../Common/footer';

const db = [
    { name: 'Hamburger', url: process.env.PUBLIC_URL + '/hamburger.jpg' },
    { name: 'Pizza', url: process.env.PUBLIC_URL + '/pizza.jpg' },
    { name: 'Ramen', url: process.env.PUBLIC_URL + '/ramen.jpg' },
    { name: 'Sandwich', url: process.env.PUBLIC_URL + '/sandwich.jpg' },
    { name: 'Tteokbokki', url: process.env.PUBLIC_URL + '/tteokbokki.jpg' },
];

function Swipe() {
    const [characters, setCharacters] = useState(db);

    const swiped = (direction, nameToDelete) => {
        console.log('Removing: ' + nameToDelete);
        setCharacters((prev) => prev.filter((character) => character.name !== nameToDelete));
        // 오른쪽으로 스와이프 했을 때만 불꽃놀이 실행
        if (direction === 'right') {
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { x: 0.5, y: 0.6 }, // 화면 중앙에서 터짐
                colors: ['#ff4e50', '#ff944e', '#fffdb0'], // 밝은 색상
            });
        }
    };

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!');
    };

    return (
        <div className="swipe-container">
            {/* Title 문구 */}
            <h1 className="title">Swipe!</h1>
            <h2 className="subtitle">and find a friend</h2>

            <div className="card-container">
                {characters.map((character) => (
                    <TinderCard
                        className="swipe"
                        key={character.name}
                        onSwipe={(dir) => swiped(dir, character.name)}
                        onCardLeftScreen={() => outOfFrame(character.name)}
                    >
                        <div
                            style={{ backgroundImage: `url(${character.url})` }}
                            className="swipe-card"
                        >
                            <h3>{character.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>

          {/* Footer */}
            <Footer />
        </div>
    );
}

export default Swipe;
