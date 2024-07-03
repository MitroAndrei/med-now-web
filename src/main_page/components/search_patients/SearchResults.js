import React from 'react';
import { List, ListItem, ListItemText, Paper } from '@mui/material';
import {Patient} from "./Patient";

const SearchResults = ({ results, onSelect }) => {
    const handleItemClick = (item) => {
        if (onSelect) {
            onSelect(item);
        }
    };

    return (
        <Paper style={{ position: 'absolute', width: '100%', zIndex: 1 }}>
            { results.length !== 0 &&
            <List>
                {results.map((result, index) => (
                    <ListItem button key={index} onClick={() => handleItemClick(result)}>
                        <ListItemText primary={Patient(result)} />
                    </ListItem>
                ))}
            </List>
            }
        </Paper>
    );
};

export default SearchResults;
