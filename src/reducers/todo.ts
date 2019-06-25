import {
    ACTION_TYPES,
    VisibilityFilters
} from '../constants'

import { produce } from "immer";
import { combineReducers } from 'redux';


/* 典型的应用 state 
    {
        domainData1 : {},
        domainData2 : {},
        appState1 : {},
        appState2 : {},
        ui : {
            uiState1 : {},
            uiState2 : {},
        }
    }
*/
export type TodoState = {
    // 应用状态（App state）: 特定于应用某个行为的数据
    visibilityFilter: string | void;
    // 域数据（Domain data）: 应用需要展示、使用或者修改的数据
    todos: {
        id: number;
        text: string;
        completed: boolean;
    }[];
};

export const todos = (state: {
    id: number;
    text: string;
    completed: boolean;
}[] = [], action: any) => {
    let newstate
    switch (action.type) {
        case ACTION_TYPES.ADD_TODO:
            newstate = produce(state, draft => {
                draft.push({
                    id: action.id,
                    text: action.text,
                    completed: false
                })
            })
            return newstate
        case ACTION_TYPES.TOGGLE_TODO:
            newstate = produce(state, draft => {
                draft.map(todo => {
                    if (todo.id === action.id) {
                        todo.completed = !todo.completed
                    }
                })
            })
            return newstate
        default:
            return state
    }
}

export const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

export const todoReducer = combineReducers({
    todos,
    visibilityFilter
})
