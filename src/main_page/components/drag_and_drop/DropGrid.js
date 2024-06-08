// DropArea.js
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';
import DropRow from "./PrescribedMed";

const DropArea = () => {
    const [cards, setCards] = useState([]);

    const [, drop] = useDrop(() => ({
        accept: 'CARD',
        drop: (item) => addCardToArea(item.id),
    }));

    const addCardToArea = (id) => {
        setCards((prevCards) => [...prevCards, { id, text: `Card ${id}` }]);
    };

    const updateCard = (newCard) => {
        setCards((prevCards) => prevCards.map((card) => {
            if (card.id === newCard.id) {
                return newCard;
            }
            return card;
        }));
    };

    const removeMed = (id) => {
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));
        // console.log(cards.filter((card) => card.id !== id));
    };

    return (
        <div
            ref={drop}
            style={{
                minHeight: '200px',
                backgroundColor: 'lightblue',
                padding: '16px',
            }}
        >
            {cards.map((card) => (
                <DropRow key={card.id} card={card} updateMed={updateCard} removeMed={removeMed}/>
            ))}
        </div>
    );
};

export default DropArea;
