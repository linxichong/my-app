import * as React from 'react'

export interface TodoProps {
    onClick: () => void;
    completed: boolean;
    text: string;
}

const Todo: React.SFC<TodoProps> = (props) => {
    return (<li onClick={props.onClick} style={{ textDecoration: props.completed ? 'line-through' : 'none' }}>
        {props.text}
    </li>);
}

export default Todo