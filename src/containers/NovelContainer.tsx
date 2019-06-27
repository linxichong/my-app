import * as React from 'react'
import NovelList from '../components/NovelList';
import { useEffect } from "react";
import { AppStateType } from '../store/configureStore';
import { searchNovels } from '../actions/novel';
import { Novel } from '../types/novel';
import { connect } from 'react-redux';

export interface NovelContainerProps {
    isLoading: boolean;
    data: Array<Novel>;
    // 通过中间件自动注入
    dispatch: any;
}

const NovelContainer: React.SFC<NovelContainerProps> = (props) => {
    // componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合
    // 保持render的纯净，副作用操作都放到渲染之后执行
    useEffect(() => {
        let { dispatch } = props;
        dispatch(searchNovels('test'))
    }, [])

    let handleClick = () => {
        try {
            throw "11111111";
        } catch (error) {
            console.log(error)
        }
    }

    // 加载中UI
    if (!props.isLoading) {
        return (<div>loading...</div>);
    }
    if (props.data.length == 0) {
        return (
            <div>
                No Data...
                <button onClick={handleClick}>Click Me</button>
            </div>
        );
    }
    // 加载完成后UI
    return (
        <NovelList novels={props.data}></NovelList>
    );
}

// connect生成容器组件
export default connect(
    // 将state绑定到容器组件props上
    ({ novel }: AppStateType) => novel,
)(NovelContainer);