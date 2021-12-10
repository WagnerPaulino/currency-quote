import { Store } from "redux";
import { getAxios } from "../config/Configs";
import { CurrencyHistory } from "../models/CurrencyHistory";
import { CurrencyHistoryState } from "../reducers/CurrencyHistoryReducer";

const defaultWhere = {
    offset: 0,
    where: {
        code: {
            regexp: "/BRL$/"
        }
    },
    include: [
        {
            relation: "history",
            scope: {
                limit: 1,
                order: "create_date DESC",
                where: {
                    codein: "BRL"
                },
            }
        }
    ]
}

export function findCurrenciesHistory(): (store: Store<CurrencyHistoryState>) => void {
    return (store) => {
        getAxios().get<CurrencyHistory[]>('/currency-histories', {
            params: { filter: defaultWhere }
        }).then(currencies => store.dispatch<CurrencyHistoryState>({
            type: 'CurrencyHistoryActionMultiple',
            currencyHistories: currencies.data,
            currencyHistory: {}
        }))
    }
}
