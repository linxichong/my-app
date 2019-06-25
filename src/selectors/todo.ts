import { createSelector } from "reselect";
import { TodoState } from "src/reducers/todo";


const getVisibilityFilter = (state: TodoState) => state.visibilityFilter
const getTodos = (state: TodoState) => state.todos


export const getVisibleTodos = createSelector(
    [getVisibilityFilter, getTodos],
    (visibilityFilter, todos) => {
        switch (visibilityFilter) {
            case 'SHOW_COMPLETED':
                return todos.filter(t => t.completed)
            case 'SHOW_ACTIVE':
                return todos.filter(t => !t.completed)
            case 'SHOW_ALL':
                return todos
        }
    }
);