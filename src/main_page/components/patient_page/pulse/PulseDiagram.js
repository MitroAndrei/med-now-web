// PulseDiagram.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);

const PulseDiagram = ({ data }) => {
    const domain = [60, (dataMax) => (dataMax < 80 ? 80 : dataMax)];


    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={domain}/>
                <Tooltip />
                <Line type="monotone" dataKey="pulse" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default PulseDiagram;
