import { connect } from 'react-redux'
import TodoList from '../../components/todo/TodoList'
import { toggleTodo } from '../../actions/todo'

import { getVisibleTodos } from 'src/selectors/todo';
import { AppState } from '../../store/configureStore';

const mapStateToProps = ({ todo }: AppState) => {
    return {
        todos: getVisibleTodos(todo)
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onTodoClick: (id: number) => {
            dispatch(toggleTodo(id))
        }
    }
}

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default VisibleTodoList