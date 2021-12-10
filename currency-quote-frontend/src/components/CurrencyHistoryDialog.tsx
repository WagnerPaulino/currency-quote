import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Dialog, DialogContent, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { findCurrenciesHistoryFieldsByCode, transformCurrencyHistoryFields } from '../actions/CurrencyHistoryFieldAction';
import { Currency } from '../models/Currency';

interface Props {
    open: boolean;
    onClose: () => void
    currencyCode?: string
}

export function CurrencyHistoryDialog({ open, onClose, currencyCode }: Props) {

    const currencyFields: Currency[] = useSelector((props: any) => {
        return props.currencyHistoryFieldReducer.currencyHistoryFields
    });
    const [chartData, setChartData] = useState<Array<Partial<Currency>>>([]);
    const dispatch = useDispatch()

    useEffect(() => {
        if (currencyCode) {
            dispatch(findCurrenciesHistoryFieldsByCode(`${currencyCode}BRL`))
        }
    }, [dispatch, currencyCode])

    useEffect(() => {
        if (currencyFields.length > 0) {
            setChartData(transformCurrencyHistoryFields(currencyFields));
        }
    }, [currencyFields])

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} fullScreen>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {currencyCode}'s Chart
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="high" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="ask" stroke="#8884d8" />
                        <Line type="monotone" dataKey="low" stroke="#d00000" />
                    </LineChart>
                </ResponsiveContainer>
            </DialogContent>
        </Dialog>
    );

}