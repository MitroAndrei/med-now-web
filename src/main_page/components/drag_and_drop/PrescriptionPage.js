// App.js
import React, {useState} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import MedsGrid from "./MedsGrid";
import DropArea from "./DropGrid";
import {Button} from "@mui/material";

import {ref, set, push, getDatabase} from "firebase/database";
const PrescriptionPage = ({patient, db}) => {
    const cards = [
        {id: 1, text: 'Card 1'},
        {id: 2, text: 'Card 2'},
        {id: 3, text: 'Card 3'},
        {id: 4, text: 'Card 4'},
        {id: 5, text: 'Card 5'},

    ];

    const [meds,setMeds] = useState([]);

    const handleSave = () => {

        console.log("Saving prescription")
        console.log(meds)
        const dd = getDatabase();
        const patientsTreatmentRef = ref(dd,`treatments/${patient.id}`);
        const newTreatmentRef = push(patientsTreatmentRef);
        let maxDate = new Date().toISOString();
        let minDate = new Date().toISOString();
        meds.forEach((med) => {
            if (med.startDate < minDate) {
                minDate = med.startDate;
            }
            if (med.endDate > maxDate) {
                maxDate = med.endDate;
            }
        })
        set(newTreatmentRef, {startDate: minDate, endDate: maxDate}).catch((error) => {
            console.error("Error writing document: ", error);
        });

        const listTreatmentRef = ref(dd,`treatments/${patient.id}/${newTreatmentRef.key}/meds`);
        const m = JSON.stringify(meds[0])
        // console.log(m)
        meds.forEach((med) => {
            console.log(med)
            set(push(listTreatmentRef), med).catch((error) => {
                console.error("Error writing document: ", error);
            });
        })
        // set(newTreatmentRef, meds).catch((error) => {
        //     console.error("Error writing document: ", error);
        // });
    }

    return (
        <>
            <div>
                <h1>Prescription for {patient.firstName}</h1>
                <Button onClick={handleSave}> Export</Button>
            </div>
            <DndProvider backend={HTML5Backend}>
                <div style={{display: 'flex', height: '100vh'}}>
                    <div style={{flex: 3, padding: '16px'}}>
                        <DropArea meds={meds} setMeds={setMeds}/>
                    </div>
                    <div style={{flex: 1, padding: '16px'}}>
                        <MedsGrid cards={cards}/>
                    </div>
                </div>
            </DndProvider>
        </>

    );
};

export default PrescriptionPage;
