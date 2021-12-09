import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { CustomMiddleware } from './config/CustomMiddleware';
import { currencyHistoryReducer } from './reducers/CurrencyHistoryReducer';
import { currencyReducer } from './reducers/CurrencyReducer';
import { RouterDefinition } from './RouterDefinition';

const rootReducer = combineReducers({
  currencyHistoryReducer: currencyHistoryReducer,
  currencyReducer: currencyReducer
})

const store = createStore(rootReducer, applyMiddleware(CustomMiddleware))

function App() {
  return (
    <Provider store={store}>
      <RouterDefinition />
    </Provider>
  );
}

export default App;
