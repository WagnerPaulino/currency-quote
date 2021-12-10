import { Store } from "redux"
import { getAxios } from "../config/Configs"
import { Currency } from "../models/Currency"
import { CurrencyHistoryFieldState } from "../reducers/CurrencyHistoryFieldsReducer"

const defaultWhere = {
    order: "create_date"
}

export function findCurrenciesHistoryFieldsByCode(code: string): (store: Store<CurrencyHistoryFieldState>) => void {
    return (store) => {
        getAxios().get<Currency[]>(`/currency-histories/${code}/currency-historic-fields`, {
            params: { filter: defaultWhere }
        })
            .then(currencies => store.dispatch<CurrencyHistoryFieldState>({
                type: 'CurrencyHistoryFieldActionMultiple',
                currencyHistoryFields: currencies.data,
                currencyHistoryField: {}
            }))
    }
}

export function transformCurrencyHistoryFields(currencies: Currency[] = []) {
    return currencies.map(({ create_date, ask, high, low }) => ({ create_date, ask, high, low }))
}