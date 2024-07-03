import {Label} from "@mui/icons-material";
import {
    FormControlLabel,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    ToggleButton
} from "@mui/material";

import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import React, {useEffect, useState} from 'react';
import {
    Box,
} from '@mui/material';
import {DesktopDatePicker, DesktopTimePicker, DigitalClock, LocalizationProvider} from "@mui/x-date-pickers";
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import dayjs from "dayjs";

const SensorType = ["Temperature", "Heart Rate", "Blood Pressure", "Oxygen Saturation"];
const CompareType = ["Above","Below"];

const DropRow = ({ med, updateMed, removeMed }) => {

    useEffect(() => {
        console.log(med)
    }, [med]);

    const [medData,setMedData] = useState({
        id: med.id,
        name: med.text,
        quantity:0,
        time: dayjs(Date.now()),
        startDate: dayjs(Date.now()),
        endDate: dayjs(Date.now()),
        conditional: false,
        sensor: "",
        sensorQuantity: 0,
        compare: ""
    })

    useEffect(() => {
        updateMed(medData);
        console.log(medData)
    }, [medData]);

    const handleRemove = () => {
        removeMed(med.id);
    }
    const handleSensorChange = (event) => {
        setMedData(prevState => ({
            ...prevState,
            sensor: event.target.value
        }))
    }
    const handleCompareChange = (event) => {
        setMedData(prevState => ({
            ...prevState,
            compare: event.target.value
        }))
    }

    const handleConditionalChange = (event) => {
        setMedData(prevState => ({
            ...prevState,
            conditional: !prevState.conditional
        }))
    }

    const handleQuantityChange = (newQuantity) => {
        setMedData(prevState => ({
            ...prevState,
            quantity: Number(newQuantity)
        }))
    }

    const handleSensorQuantityChange = (event) => {
        setMedData(prevState => ({
            ...prevState,
            sensorQuantity: Number(event.target.value)
        }))
    }

    const handleTimeChange = (newTime) => {
        setMedData(prevState => ({
            ...prevState,
            time: newTime
        }))
    }

    const handleStartDateChange = (newDate) => {
        setMedData(prevState => ({
            ...prevState,
            startDate: newDate
        }))
    }

    const handleEndDateChange = (newDate) => {
        setMedData(prevState => ({
            ...prevState,
            endDate: newDate
        }))
    }

    const {quantity, time, startDate, endDate, conditional, sensor, sensorQuantity, compare} = medData;

    return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 2,
                }}
            >
                <Box sx={{ marginRight: 2 }}>{medData.name}</Box>

                <ToggleButton
                    sx={{ marginRight: 2 }}
                    color={"success"}
                    size="large"
                    value = "conditional"
                    selected={conditional}
                    onChange={handleConditionalChange}
                >
                    <CheckIcon />
                </ToggleButton>

                <QuantityPicker quantity={quantity} setQuantity={handleQuantityChange} />

                {!conditional?
                    <DesktopTimePicker
                        label="Time"
                        ampm={false}
                        sx={{ marginRight: 2 }}
                        formatDensity={'spacious'}
                        value={time}
                        onChange={handleTimeChange}
                    /> :
                    <>
                        <Select
                            value={sensor}
                            sx={{ marginRight: 2 }}
                            autoWidth ={true}
                            onChange={handleSensorChange}
                        >
                            {SensorType.map((sensor) => (
                                <MenuItem value={sensor}>{sensor}</MenuItem>
                            ))}
                        </Select>

                        <Select
                            value={compare}
                            sx={{ marginRight: 2 }}
                            autoWidth ={true}
                            onChange={handleCompareChange}
                        >
                            {CompareType.map((compare) => (
                                <MenuItem value={compare}>{compare}</MenuItem>
                            ))}
                        </Select>

                        <TextField
                            type="number"
                            value={sensorQuantity}
                            onChange={handleSensorQuantityChange}
                            sx={{ marginRight: 2 }}
                            label="Quantity"
                            variant="outlined"
                        />
                    </>

                }
                <>
                </>
                <DesktopDatePicker
                    label="Start Treatment"
                    format={'DD/MM/YYYY'}
                    value={startDate}
                    sx={{ marginRight: 2 }}
                    disablePast={true}
                    onChange={handleStartDateChange}
                    />
                <DesktopDatePicker
                    label="End Treatment"
                    format={'DD/MM/YYYY'}
                    value={endDate}
                    minDate={startDate}
                    sx={{ marginRight: 2 }}
                    disablePast={true}
                    onChange={handleEndDateChange}
                />
                <IconButton color={"warning"} size={"small"} onClick={handleRemove}>
                    <ClearIcon aria-label="delete" />
                </IconButton>
            </Box>
    );
};


const QuantityPicker = ({ quantity, setQuantity }) => {

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    }
    const handleDecrement = () => {
        if(quantity-1 >= 0){
            setQuantity(quantity - 1);
        }
    }

    const handleChange = (e) => {
        if(Number(e.target.value)>=0){
            setQuantity(Number(e.target.value));
        }
    }

    return (
        <>
            <IconButton onClick={handleDecrement}>
                <RemoveCircleIcon />
            </IconButton>
            <TextField
                type="number"
                value={quantity}
                onChange={(e) => handleChange(e)}
                label="Quantity"
                variant="outlined"
                InputProps={{
                    endAdornment: <InputAdornment position="end">cps</InputAdornment>,
                }}
            />
            <IconButton onClick={handleIncrement} sx={{ marginRight: 2 }}>
                <AddCircleIcon />
            </IconButton>
        </>
    )
};

export default DropRow;

