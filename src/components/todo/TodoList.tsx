import * as React from 'react'
import Todo from './Todo'

export interface TodoListProps {
    todos: any[];
    onTodoClick: (index: number) => void;
}


class TodoList extends React.Component<TodoListProps> {
    constructor(props: TodoListProps) {
        super(props);
    }

    render() {
        return (<ul>{this.props.todos.map((todo, index) => {
            return (
                <Todo key={index} {...todo} onClick={() => this.props.onTodoClick(index)} />
            );
        })}</ul>);
    }
}

export default TodoList;