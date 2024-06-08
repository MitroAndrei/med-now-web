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
// DropRow.js
import React, {useEffect, useState} from 'react';

// DropRow.js
import {
    Button,
    Box,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {DesktopDatePicker, DesktopTimePicker, DigitalClock, LocalizationProvider} from "@mui/x-date-pickers";
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import dayjs from "dayjs";

const SensorType = ["Temperature", "Heart Rate", "Blood Pressure", "Oxygen Saturation"];
const CompareType = ["Above","Below"];

const DropRow = ({ card, updateMed, removeMed }) => {

    const [quantity, setQuantity] = useState(0);
    const [time, setTime] = useState(dayjs(Date.now()));
    const [startDate, setStartDate] = useState(dayjs(Date.now()));
    const [endDate, setEndDate] = useState(dayjs(Date.now()));
    const [conditional, setConditional] = useState(false);
    const [sensor, setSensor] = useState("");
    const [sensorQuantity, setSensorQuantity] = useState("");
    const [compare, setCompare] = useState("");

    const [medData,setMedData] = useState({
        id: card.id,
        text: card.text,
        quantity,
        time,
        startDate,
        endDate,
        conditional,
        sensor,
        sensorQuantity,
        compare
    })

    useEffect(() => {
        updateMed(medData);
        console.log(medData)
    }, [medData]);

    const handleRemove = () => {
        removeMed(card.id);
    }
    const handleSensorChange = (event) => {
        setSensor(event.target.value);
    }
    const handleCompareChange = (event) => {
        setCompare(event.target.value);
    }

    const handleConditionalChange = (event) => {
        setConditional(event.target.checked);
    }

    return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 2,
                }}
            >
                <Box sx={{ marginRight: 2 }}>{card.text}</Box>

                <ToggleButton
                    sx={{ marginRight: 2 }}
                    color={"success"}
                    size="large"
                    value = "conditional"
                    selected={conditional}
                    onChange={() => { setConditional(!conditional); }}
                >
                    <CheckIcon />
                </ToggleButton>

                <QuantityPicker quantity={quantity} setQuantity={setQuantity} />

                {!conditional?
                    <DesktopTimePicker
                        label="Time"
                        ampm={false}
                        sx={{ marginRight: 2 }}
                        formatDensity={'spacious'}
                        value={time}
                        onChange={(newTime) => (setTime(newTime))}
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
                            onChange={(e) => setSensorQuantity(Number(e.target.value))}
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
                    onChange={(newValue) => setStartDate(newValue)}
                    />
                <DesktopDatePicker
                    label="End Treatment"
                    format={'DD/MM/YYYY'}
                    value={endDate}
                    minDate={startDate}
                    sx={{ marginRight: 2 }}
                    disablePast={true}
                    onChange={(newValue) => setEndDate(newValue)}
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

