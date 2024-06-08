// App.js
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MedsGrid from "./MedsGrid";
import DropArea from "./DropGrid";

const PrescriptionPage = ({patient}) => {
    const cards = [
        { id: 1, text: 'Card 1' },
        { id: 2, text: 'Card 2' },
        { id: 3, text: 'Card 3' },
        { id: 4, text: 'Card 4' },
        { id: 5, text: 'Card 5' },

    ];

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: 'flex', height: '100vh' }}>
                <div style={{ flex: 3, padding: '16px' }}>
                    <DropArea />
                </div>
                <div style={{ flex: 1, padding: '16px' }}>
                    <MedsGrid cards={cards} />
                </div>
            </div>
        </DndProvider>
    );
};

export default PrescriptionPage;
