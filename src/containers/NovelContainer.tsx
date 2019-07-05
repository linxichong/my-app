import * as React from "react";
import NovelList from "../components/NovelList";
import { AppStateType } from "../store/configure-store";
import { fetchNovels } from "../actions/novel";
import { Novel } from "../types/novel";
import { connect } from "react-redux";

export interface NovelContainerProps {
  isLoading: boolean;
  data: Novel[];
  // 通过中间件自动注入
  dispatch: Function;
}

const NovelContainer: React.SFC<NovelContainerProps> = props => {
  const [ignore, setIgnore] = React.useState(false);
  // componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合
  // 保持render的纯净，副作用操作都放到渲染之后执行
  React.useEffect(() => {
    const { dispatch } = props;
    if (!ignore) {
      dispatch(fetchNovels());
    }
    return () => {
      setIgnore(true);
    };
  }, []);

  const handleClick = () => {
    try {
      props.dispatch(fetchNovels());
    } catch (error) {
      console.log(error);
    }
  };

  // 加载中UI
  if (props.isLoading) {
    return <div>loading...</div>;
  }
  if (props.data && props.data.length == 0) {
    return (
      <div>
        No Data...
        <button onClick={handleClick}>Refresh</button>
      </div>
    );
  }
  // 加载完成后UI
  return (
    <>
      <button onClick={handleClick}>Refresh</button>
      <NovelList novels={props.data} />
    </>
  );
};

// connect生成容器组件
export default connect(
  // 将state绑定到容器组件props上
  ({ novel }: AppStateType) => novel
)(NovelContainer);
