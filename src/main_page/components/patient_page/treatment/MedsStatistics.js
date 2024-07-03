// MedsStatistics.jsx
import React from 'react';
import {Box, Paper, Typography, List, ListItem, ListItemText, Grid} from '@mui/material';
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from 'recharts';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter' // ES 2015

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
const MedsStatistics = ({meds}) => {
    const today = dayjs();
    const calculatePieData = (med) => {
        const startDate = dayjs(med.startDate);
        const endDate = dayjs(med.endDate).isBefore(today) ? dayjs(med.endDate) : today;
        const totalDays = endDate.diff(startDate, 'day') + 1;
        const dates = med.takenDates ? Object.keys(med.takenDates) : [];
        const relevantDates = dates.filter(date => {
            const current = dayjs(date);
            return current.isSameOrAfter(startDate,'day') && current.isSameOrBefore(endDate,'day');
        });
        const relevantDays = relevantDates.length;
        const missingDays = totalDays - relevantDays;
        return [
            { name: 'Days Taken', value: relevantDays },
            { name: 'Days Missed', value: missingDays },
        ];
    };

    const COLORS = ['#3df680', '#ff4260'];

    return (
        <Box sx={{marginBottom: 3}}>
            <Typography variant="h6" gutterBottom>Meds Statistics</Typography>
            <Grid container spacing={2}>
                {meds.map((med, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Paper variant="outlined" sx={{ padding: 1 }}>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>{med.name}</Typography>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>{dayjs(med.startDate).format('DD.MM.YYYY')} - {dayjs(med.endDate).format('DD.MM.YYYY')} </Typography>
                            <ResponsiveContainer width="100%" height={100}>
                                <PieChart>
                                    <Pie
                                        data={calculatePieData(med)}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={40} // Reduced from 80 to 60
                                        fill="#8884d8"
                                    >
                                        {calculatePieData(med).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MedsStatistics;
