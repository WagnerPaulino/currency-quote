import { Dialog, DialogTitle } from '@mui/material';
import React from 'react';

interface Props {
    open: boolean;
    onClose: () => void
    currencyCode?: string
}

export function CurrencyHistoryDialog({ open, onClose, currencyCode }: Props) {

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>{currencyCode}'s Chart</DialogTitle>
        </Dialog>
    );

}