import {Card, CardContent, Typography} from "@mui/material";
import React from "react";
import dayjs from "dayjs";

export const MedCard = ({medicament}) => {
    return(
        <Card>
            <CardContent>
                <Typography variant="h6">{medicament.name}</Typography>
                <Typography variant="body2">Since: {dayjs(medicament.startDate).format('DD.MM.YYYY')}</Typography>
                <Typography variant="body2">Until: {dayjs(medicament.endDate).format('DD.MM.YYYY')}</Typography>
            </CardContent>
        </Card>
    )
}