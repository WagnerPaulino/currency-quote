import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findCurrenciesHistory } from '../actions/CurrencyHistoryActions';
import { GridCardCurrencyHistory } from '../components/GridCardCurrencyHistory';
import { CurrencyHistory } from '../models/CurrencyHistory';

export function Home() {

    const currencyHistory: CurrencyHistory[] = useSelector(({ currencyHistoryReducer }: any) => {
        return currencyHistoryReducer.currencyHistories
    });
    const dispatch = useDispatch();

    useEffect(() => {
        const intervalId = setInterval(() => dispatch(findCurrenciesHistory()), 60000)
        return () => clearInterval(intervalId);
    }, [dispatch])

    useEffect(() => {
        dispatch(findCurrenciesHistory())
    }, [dispatch])

    if (currencyHistory.length === 0) {
        return (<></>)
    }

    return (
        <GridCardCurrencyHistory currenciesHistory={currencyHistory} />
    )
}