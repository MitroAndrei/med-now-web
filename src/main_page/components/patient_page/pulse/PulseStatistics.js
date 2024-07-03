import PulseDiagram from "./PulseDiagram";
import {Box, Typography} from "@mui/material";
import dayjs from "dayjs";

export const PulseStatistics = ({pulseData}) => {
    const splitDataIntoSets = (data, entriesPerSet) => {
        const sets = [];
        for (let i = data.length; i > 0; i -= entriesPerSet) {
            let tempData = data.slice(Math.max(i - entriesPerSet, 0), i);
            tempData.sort((a, b) => new Date(a.date) - new Date(b.date));
            sets.push(tempData);
        }
        return sets.reverse();
    };

    const aggregateData = (data, granularity = 'daily') => {
        data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const groupedData = {};

        data.forEach(entry => {
            const date = dayjs(entry.timestamp).startOf(granularity);
            const dateStr = date.format('YYYY-MM-DD');

            if (!groupedData[dateStr]) {
                groupedData[dateStr] = [];
            }
            groupedData[dateStr].push(entry.pulse);
        });

        const aggregatedData = Object.keys(groupedData).map(date => {
            const pulses = groupedData[date];
            const avgPulse = pulses.reduce((sum, pulse) => sum + pulse, 0) / pulses.length;
            console.log(date)
            return {date, pulse: avgPulse.toPrecision(3)};
        });

        return aggregatedData;
    };

    const getFormattedDateRange = (dataSet) => {
        const startDate = dayjs(dataSet[0].date).format('MMMM YYYY');
        const endDate = dayjs(dataSet[dataSet.length - 1].date).format('MMMM YYYY');
        return `${startDate} - ${endDate}`;
    };


    const aggregatedPulseData = aggregateData(pulseData);
    const entriesPerSet = Math.ceil(365 / 3); // Number of entries per graph
    const dataSets = splitDataIntoSets(aggregatedPulseData, entriesPerSet); // Split data into sets

    return (
        <>
            {dataSets.map((set, index) => (
                <Box key={index} sx={{marginBottom: 3}}>
                    <Typography variant="h6">Pulse Data: {getFormattedDateRange(set)}</Typography>
                    <PulseDiagram data={set}/>
                </Box>
            ))}
        </>
    );
}