import {
    ACTION_TYPES,
    VisibilityFilters
} from '../constants'

// export type Action = {
//     id: number;
//     type: string;
//     text: string;
//     filter: string;
// }

let nextTodoId = 0
export const addTodo = (text: string) => {
    return {
        type: ACTION_TYPES.ADD_TODO,
        id: nextTodoId++,
        text
    }
}

export const setVisibilityFilter = (filter: string) => {
    return {
        type: ACTION_TYPES.SET_VISIBILITY_FILTER,
        filter
    }
}

export const toggleTodo = (id: number) => {
    return {
        type: ACTION_TYPES.TOGGLE_TODO,
        id
    }
}