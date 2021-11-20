import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,combineReducers } from 'redux';
import authReducer from './store/reducer/authReducer';
import userReducer from './store/reducer/userReducer';
import timeSheetReducer from './store/reducer/timeSheetReducer';
import codeReducer from './store/reducer/codeReducer'
import thunk from 'redux-thunk';


export const rootReducer=combineReducers({
        auth:authReducer,
        user:userReducer,
        timesheet:timeSheetReducer,
        code:codeReducer
})
const store=createStore(rootReducer,applyMiddleware(thunk));

const app = (
        <Provider store={store}>
                <BrowserRouter>
                        <App />
                </BrowserRouter>
        </Provider>
);


ReactDOM.render(app, document.getElementById('root'));