import { CurrencyHistory } from "../models/CurrencyHistory";

export declare type CurrencyHistoryAction = 'CurrencyHistoryActionOne' | 'CurrencyHistoryActionMultiple'

export interface CurrencyHistoryState {
    type: CurrencyHistoryAction
    currencyHistory: CurrencyHistory
    currencyHistories: CurrencyHistory[]
}

const loadOneInitialState: CurrencyHistoryState = {
    type: 'CurrencyHistoryActionOne',
    currencyHistory: new CurrencyHistory(),
    currencyHistories: []
}

export function currencyHistoryReducer(_state: CurrencyHistoryState, action: CurrencyHistoryState): CurrencyHistoryState {
    switch (action.type) {
        case 'CurrencyHistoryActionOne':
            return action ?? loadOneInitialState;
        case 'CurrencyHistoryActionMultiple':
            return action;
        default:
            return _state ?? loadOneInitialState;
    }
}