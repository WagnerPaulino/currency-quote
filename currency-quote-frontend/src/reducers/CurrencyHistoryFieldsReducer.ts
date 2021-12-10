import { Currency } from "../models/Currency";

export declare type CurrencyHistoryFieldAction = 'CurrencyHistoryFieldActionOne' | 'CurrencyHistoryFieldActionMultiple'

export interface CurrencyHistoryFieldState {
    type: CurrencyHistoryFieldAction
    currencyHistoryField: Currency
    currencyHistoryFields: Currency[]
}

const loadOneInitialState: CurrencyHistoryFieldState = {
    type: 'CurrencyHistoryFieldActionOne',
    currencyHistoryField: new Currency(),
    currencyHistoryFields: []
}

export function currencyHistoryFieldReducer(_state: CurrencyHistoryFieldState, action: CurrencyHistoryFieldState): CurrencyHistoryFieldState {
    switch (action.type) {
        case 'CurrencyHistoryFieldActionOne':
            return action ?? loadOneInitialState;
        case 'CurrencyHistoryFieldActionMultiple':
            return action;
        default:
            return _state ?? loadOneInitialState;
    }
}