import { Currency } from "../models/Currency";

export declare type CurrencyAction = 'CurrencyActionOne' | 'CurrencyActionMultiple'

export interface CurrencyState {
    type: CurrencyAction
    currency: Currency
    currencies: Currency[]
}

const loadOneInitialState: CurrencyState = {
    type: 'CurrencyActionOne',
    currency: new Currency(),
    currencies: []
}

export function currencyReducer(_state: CurrencyState, action: CurrencyState): CurrencyState {
    switch (action.type) {
        case 'CurrencyActionOne':
            return action ?? loadOneInitialState;
        case 'CurrencyActionMultiple':
            return action;
        default:
            return _state ?? loadOneInitialState;
    }
}