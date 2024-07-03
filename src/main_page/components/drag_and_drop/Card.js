import React from 'react';
import { useDrag } from 'react-dnd';
import {CardContent, Typography,Card as MuiCard} from "@mui/material";

const Card = ({ id, text }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'CARD',
        item: { id , text},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <MuiCard
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                margin: '8px',
                cursor: 'move',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }}
            elevation={isDragging ? 2 : 4}
        >
            <CardContent>
                <Typography variant="body1">
                    {text}
                </Typography>
            </CardContent>
        </MuiCard>
    );
};

export default Card;
