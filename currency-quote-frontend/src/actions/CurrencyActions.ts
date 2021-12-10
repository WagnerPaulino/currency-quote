import { Store } from "redux";
import { getAxios, } from "../config/Configs";
import { Currency } from "../models/Currency";
import { CurrencyState } from "../reducers/CurrencyReducer";

const defaultWhere = {
    code: {
        like: "%-BRL"
    }
}

function getDefaultFilter(where: any, limit = 10, fields?: any) {
    return {
        limit,
        where,
        fields
    }
}

export function findCurrencies(): (store: Store<CurrencyState>) => void {
    return (store) => {
        getAxios().get<Currency[]>('/currencies', {
            params: { filter: getDefaultFilter(defaultWhere) }
        }).then(currencies => store.dispatch<CurrencyState>({
            type: 'CurrencyActionMultiple',
            currencies: currencies.data,
            currency: {}
        }))
    }
}