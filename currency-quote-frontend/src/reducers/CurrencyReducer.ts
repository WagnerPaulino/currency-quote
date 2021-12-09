import { Currency } from "../models/Currency";

export declare type CurrencyAction = 'One' | 'Multiple'

export interface CurrencyState {
    type: CurrencyAction
    currency: Currency
    currencies: Currency[]
}

const loadOneInitialState: CurrencyState = {
    type: 'One',
    currency: new Currency(),
    currencies: []
}

export function currencyReducer(_state = loadOneInitialState, action: CurrencyState): CurrencyState {
    switch (action.type) {
        case 'One':
            return action ?? loadOneInitialState;
        case 'Multiple':
            return action;
        default:
            return loadOneInitialState;
    }
}