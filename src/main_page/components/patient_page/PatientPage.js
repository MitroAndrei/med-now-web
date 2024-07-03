import React, {useEffect, useState} from 'react';
import { Box, Button, Typography, Paper, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CurrentTreatment from "./treatment/CurrentTreatment";
import MedsStatistics from "./treatment/MedsStatistics";
import dayjs from 'dayjs';
import {PulseStatistics} from "./pulse/PulseStatistics";
import {getDatabase, off, onChildAdded, onChildChanged, ref} from "firebase/database";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter' // ES 2015

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
const PatientPage = ({ patient, changeView }) => {

    const [currentTreatments, setCurrentTreatments] = useState([]);
    const [medications, setMedications] = useState([]);
    const [pulseData2, setPulseData] = useState([]);

    const processTreatmentData = (treatment) => {
        const today = dayjs();

        const { startDate, endDate, meds } = treatment;

        let medicationsArray = [];
        console.log(meds)

        for (let [key, value] of Object.entries(meds)) {
            console.log(key, value)
            value={...value,key:key};
            medicationsArray = [...medicationsArray,value];
        }

        console.log(medicationsArray)

        // Update current treatments if today is within the treatment period
        if (dayjs(startDate).isSameOrBefore(today,'day') && dayjs(endDate).isSameOrAfter(today,'day')) {
            setCurrentTreatments(prev => {
                const updatedTreatments = [...prev];
                medicationsArray.forEach(med => {
                    const existingIndex = updatedTreatments.findIndex(t => t.key === med.key);
                    if (existingIndex === -1) {
                        updatedTreatments.push(med);
                    } else {
                        updatedTreatments[existingIndex] = med;
                    }
                });
                return updatedTreatments;
            });
        }

        // Update medications with all prescribed medications
        setMedications(prev => {
            const updatedMedications = [...prev];
            medicationsArray.forEach(med => {
                const existingIndex = updatedMedications.findIndex(m => m.key === med.key);
                if (existingIndex === -1) {
                    updatedMedications.push(med);
                } else {
                    updatedMedications[existingIndex] = med;
                }
            });
            return updatedMedications;
        });
    };

    const handleAdd = (snapshot) => {
        const treatment = snapshot.val();
        console.log(treatment)
        processTreatmentData(treatment);
    };

    const handleChange = (snapshot) => {
        const treatment = snapshot.val();
        processTreatmentData(treatment);
    };

    const fetchPulseData = () => {
        const db = getDatabase();
        const pulseDataRef = ref(db, `sensors/${patient.id}/HeartRate`);
        console.log(`sensors/${patient.id}/HeartRate`)
        const handlePulseDataChange = (snapshot) => {
            const pulse = snapshot.val();
            const date = snapshot.key;
            setPulseData(prev => {
                const updatedPulseData = [...prev];
                updatedPulseData.push({ date, pulse });
                return updatedPulseData;
            })
        };

        onChildAdded(pulseDataRef, handlePulseDataChange);
        onChildChanged(pulseDataRef, handlePulseDataChange);

        // Cleanup listener on component unmount
        return () => {
            off(pulseDataRef, 'child_added', handlePulseDataChange);
            off(pulseDataRef, 'child_changed', handlePulseDataChange);
        };
    };

    useEffect(() => {

        setCurrentTreatments([]);
        setMedications([]);
        setPulseData([]);
        fetchPulseData();
        const db = getDatabase();
        const treatmentsRef = ref(db, `treatments/${patient.id}`);

        onChildAdded(treatmentsRef, handleAdd);
        onChildChanged(treatmentsRef, handleChange);

        // Cleanup listener on component unmount
        return () => {
            off(treatmentsRef, 'child_added', handleAdd);
            off(treatmentsRef, 'child_changed', handleChange);
        };
    }, [patient]);

    const generateMockPulseData = (startDate, days = 30) => {
        const pulseData = [];
        const start = dayjs(startDate);

        for (let i = 0; i < days; i++) {
            const currentDay = start.add(i, 'day');
            for (let j = 0; j < 100; j++) {
                const timestamp = currentDay.add(j * 6, 'minute').toISOString();
                let pulse = Math.floor(Math.random() * (80 - 60 + 1)) + 60; // Random pulse between 60 and 80
                pulseData.push({ timestamp, pulse });
            }
        }

        return pulseData;
    };

    const pulseData = generateMockPulseData('2023-06-01', 2*365/3+10);

    return (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
            {/* Patient Information */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Typography variant="h6">Nume: {patient.lastName}</Typography>
                    <Typography variant="h6">Prenume: {patient.firstName}</Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />} onClick={changeView}>Add New Treatment</Button>
            </Box>

            {/* Current Treatment */}
            <CurrentTreatment medicaments={currentTreatments}/>

            {/* History */}
            <Box>
                <Typography variant="h6" gutterBottom>History</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <PulseStatistics pulseData={[...pulseData2,...pulseData]} />
                    </Grid>
                    <Grid item xs={6}>
                        <MedsStatistics meds={medications}/>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default PatientPage;
