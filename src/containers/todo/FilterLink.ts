import { connect } from 'react-redux'
import { setVisibilityFilter } from '../../actions/todo'
import Link from '../../components/todo/Link'
import { AppState } from '../../store/configureStore';

const mapStateToProps = ({ todo }: AppState, ownProps: { filter: string }) => {
    return {
        active: ownProps.filter === todo.visibilityFilter
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: { filter: string }) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
}

const FilterLink = connect(
    // 输入逻辑：外部的数据（即state对象）如何转换为 UI 组件的参数
    mapStateToProps,
    // 输出逻辑：用户发出的动作如何变为 Action 对象，从 UI 组件传出去。
    mapDispatchToProps
)(Link)

export default FilterLink