import React from 'react';
import { useDrop } from 'react-dnd';
import DropRow from "./PrescribedMed";
import dayjs from "dayjs";

const DropArea = ({meds,setMeds}) => {

    const [, drop] = useDrop(() => ({
        accept: 'CARD',
        drop: (item) => addMedToArea(item),
    }));

    const addMedToArea = (item) => {
        console.log("Adding med to area")
        console.log(item)
        setMeds((prevMeds) => [...prevMeds, { id:item.id, text: item.text }]);
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
                backgroundColor: '#c1e9ff',
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
