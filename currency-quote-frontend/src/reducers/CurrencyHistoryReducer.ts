import { CurrencyHistory } from "../models/CurrencyHistory";

export declare type CurrencyHistoryAction = 'One' | 'Multiple'

export interface CurrencyHistoryState {
    type: CurrencyHistoryAction
    currencyHistory: CurrencyHistory
    currencyHistories: CurrencyHistory[]
}

const loadOneInitialState: CurrencyHistoryState = {
    type: 'One',
    currencyHistory: new CurrencyHistory(),
    currencyHistories: []
}

export function currencyHistoryReducer(_state = loadOneInitialState, action: CurrencyHistoryState): CurrencyHistoryState {
    switch (action.type) {
        case 'One':
            return action ?? loadOneInitialState;
        case 'Multiple':
            return action;
        default:
            return loadOneInitialState;
    }
}