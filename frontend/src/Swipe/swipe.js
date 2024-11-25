import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import './swipe.css';

const db = [
    { name: 'Hamburger', url: process.env.PUBLIC_URL + '/hamburger.jpg' },
    { name: 'Pizza', url: process.env.PUBLIC_URL + '/pizza.jpg' },
    { name: 'Ramen', url: process.env.PUBLIC_URL + '/ramen.jpg' },
    { name: 'Sandwich', url: process.env.PUBLIC_URL + '/sandwich.jpg' },
    { name: 'Tteokbokki', url: process.env.PUBLIC_URL + '/tteokbokki.jpg' },
];

function Swipe() {
    const [characters, setCharacters] = useState(db);
    const [lastDirection, setLastDirection] = useState(null);

    const swiped = (direction, nameToDelete) => {
        console.log('Removing: ' + nameToDelete);
        setCharacters((prev) => prev.filter((character) => character.name !== nameToDelete));
        setLastDirection(direction);
    };

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!');
    };

    return (
        <div className="swipe-container">
            <h1>스와이프로 밥친구 찾기</h1>
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
            {lastDirection && (
                <h2 className="info-text">You swiped {lastDirection}</h2>
            )}
            {/* Footer 추가 */}
            <div className="footer">
                <button className="btn-footer">스와이프</button>
                <button className="btn-footer">B</button>
                <button className="btn-footer">C</button>
            </div>
        </div>
    );
}

export default Swipe;
