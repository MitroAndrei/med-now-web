// App.js
import React, {useEffect, useState} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import MedsGrid from "./MedsGrid";
import DropArea from "./DropGrid";
import {Button} from "@mui/material";

import {ref, set, push, getDatabase, onChildAdded, off} from "firebase/database";
const PrescriptionPage = ({patient, changeView}) => {
    const [cards,setCards] = useState([]);

    const [originalCards,setOriginalCards] = useState(cards);

    const [meds,setMeds] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const medicamentsRef = ref(db,`medicaments`);

        const handleAdd = (snapshot) => {
            const medicament = snapshot.val();
            setCards(prev => [...prev, {id: snapshot.key, text: medicament.name}]);
            setOriginalCards(prev => [...prev, {id: snapshot.key, text: medicament.name}])
        };

        onChildAdded(medicamentsRef, handleAdd);
        return () => {
            off(medicamentsRef, 'child_added', handleAdd);
        };

    }, []);

    const handleSearch = (searchTerm) => {
        const results = originalCards.filter((card) =>
            card.text.toLowerCase().startsWith(searchTerm.toLowerCase()));
        console.log(results)
        setCards(results);
    }

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
        changeView();
    }

    return (
        <>
            <div>
                <h1>Prescription for {patient.firstName}</h1>
                <Button
                    variant="contained"
                    color="success"
                    style={{ marginRight: '8px' }}
                    onClick={handleSave}
                >
                    Export
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={changeView}
                >
                    Cancel
                </Button>
            </div>
            <DndProvider backend={HTML5Backend}>
                <div style={{display: 'flex', height: '100vh'}}>
                    <div style={{flex: 3, padding: '16px'}}>
                        <DropArea meds={meds} setMeds={setMeds}/>
                    </div>
                    <div style={{flex: 1, padding: '16px'}}>
                        <MedsGrid cards={cards} handleSearch={handleSearch}/>
                    </div>
                </div>
            </DndProvider>
        </>

    );
};

export default PrescriptionPage;
