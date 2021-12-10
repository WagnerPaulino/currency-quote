import { FavoriteBorder } from "@mui/icons-material";
import { Button, CardActions, Grid } from "@mui/material";
import React, { useMemo, useState } from 'react';
import { Currency } from "../models/Currency";
import { CurrencyHistory } from "../models/CurrencyHistory";
import { currencyFormat } from "../utils/Utils";
import { CardCustom } from "./CardCustom";
import { CurrencyHistoryDialog } from "./CurrencyHistoryDialog";

interface GridProps {
    currenciesHistory: CurrencyHistory[];
}

export function GridCardCurrencyHistory({ currenciesHistory }: GridProps) {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [currencyCode, setCurrencyCode] = useState<string>();
    const [histories, setHistories] = useState<Currency[]>([]);

    const onDialogClose = () => {
        setOpenDialog(false)
    }

    const onOpenDialog = (currencyCode: string) => {
        return () => {
            setCurrencyCode(currencyCode)
            setOpenDialog(true)
        }
    }

    useMemo(() => {
        let hists: Currency[] = []
        currenciesHistory.forEach(({ history }) => {
            if (history) {
                hists = hists.concat(history)
            }
        })
        setHistories(hists)
    }, [currenciesHistory])

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    histories.map((hist, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <CardCustom buttonActions={() => (
                                <CardActions>
                                    <Button><FavoriteBorder>FavoriteBorder</FavoriteBorder></Button>
                                    <Button onClick={onOpenDialog(hist.code ?? '')}>Open chart history</Button>
                                </CardActions>
                            )} title={hist.code ?? ''} subtitle={hist.name ?? ''}><span>{currencyFormat(hist.ask ?? "0")}</span></CardCustom>
                        </Grid>
                    ))
                }
            </Grid>
            {openDialog ? <CurrencyHistoryDialog open={openDialog} onClose={onDialogClose} currencyCode={currencyCode} /> : <></>}
        </>
    )
}