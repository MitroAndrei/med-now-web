import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import {MedCard} from "./MedCard";

const CurrentTreatment = ({ medicaments }) => {
    return (
        <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" gutterBottom>Current Treatment</Typography>
            <Grid container spacing={2}>
                {medicaments.map((medicament, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <MedCard medicament={medicament} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CurrentTreatment;
