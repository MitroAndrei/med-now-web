// DropArea.js
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';
import DropRow from "./PrescribedMed";
import dayjs from "dayjs";

const DropArea = ({meds,setMeds}) => {

    const [, drop] = useDrop(() => ({
        accept: 'CARD',
        drop: (item) => addMedToArea(item.id),
    }));

    const addMedToArea = (id) => {
        setMeds((prevMeds) => [...prevMeds, { id, text: `Med ${id}` }]);
    };

    const updateMed = (newMed) => {
        setMeds((prevMeds) => prevMeds.map((med) => {
            if (med.id === newMed.id) {
                return {...newMed,
                    time: dayjs(newMed.time).toISOString(),
                    startDate: dayjs(newMed.startDate).toISOString(),
                    endDate: dayjs(newMed.endDate).toISOString(),
                };
            }
            return med;
        }));
    };

    const removeMed = (id) => {
        setMeds((prevMeds) => prevMeds.filter((med) => med.id !== id));
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
            {meds.map((med) => (
                <DropRow key={med.id} med={med} updateMed={updateMed} removeMed={removeMed}/>
            ))}
        </div>
    );
};

export default DropArea;
