import { ACTION_TYPES } from "../../constants";
import { handleActions } from "redux-actions";

// 定义管理状态树的结构类型
export interface LayoutStateType {
  isSidebarOpened: boolean;
}

// 初始化状态
const initialState: LayoutStateType = {
  isSidebarOpened: false
};

// 根据不同的Action生成Reducer
const layoutReducer = handleActions(
  {
    [ACTION_TYPES.TOGGLE_SIDEBAR]: (state: LayoutStateType) => ({
      ...state,
      isSidebarOpened: !state.isSidebarOpened
    })
  },
  initialState
);

export default layoutReducer;
