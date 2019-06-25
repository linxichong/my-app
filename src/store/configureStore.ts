import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'
import { todoReducer, TodoState } from 'src/reducers/todo';

export const history = createBrowserHistory();
export type AppState = {
    router: RouterState;
    todo: TodoState;
};

const rootReducer = combineReducers({
    todo: todoReducer,
    router: connectRouter(history),
})

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk,
        routerMiddleware(history)
    )
)