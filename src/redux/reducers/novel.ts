import { ACTION_TYPES } from "../../constants";
import { Novel } from "../../types";
import { handleActions, Action } from "redux-actions";

// 定义管理状态树的结构类型
export interface NovelStateType {
  isLoading: boolean;
  data: Novel[];
}

// 初始化状态
const initialState: NovelStateType = {
  isLoading: false,
  data: []
};

// 根据不同的Action生成Reducer
const novelReducer = handleActions(
  {
    [ACTION_TYPES.FETCH_NOVELS]: (state: NovelStateType) => ({
      ...state,
      isLoading: true,
      data: []
    }),
    [ACTION_TYPES.FETCH_NOVELS_OK]: (
      state: NovelStateType,
      action: Action<Novel[]>
    ) => ({
      ...state,
      data: action.payload,
      isLoading: false
    }),
    [ACTION_TYPES.FETCH_NOVELS_NG]: (state: NovelStateType) => ({
      ...state,
      isLoading: false,
      data: []
    })
  },
  initialState
);

export default novelReducer;
