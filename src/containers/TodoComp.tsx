
import Footer from "../components/todo/Footer";
import * as React from 'react'
import AddTodo from "./todo/AddTodo";
import VisibleTodoList from "./todo/VisibleTodoList";

export interface Props {

}

class TodoComp extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (<div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>);
    }
}

export default TodoComp;