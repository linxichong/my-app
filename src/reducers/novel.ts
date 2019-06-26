import { ACTION_TYPES } from "../constants";
import { Novel } from "src/types/novel";
import { handleActions, Action } from "redux-actions";

// 定义管理状态树的结构类型
export type NovelStateType = {
    isLoading: boolean;
    data: Array<Novel>;
}

// 初始化状态
export const initialState: NovelStateType = {
    isLoading: false,
    data: [],
};

// 根据不同的Action生成Reducer
export const novelReducer = handleActions({
    [ACTION_TYPES.FETCH_NOVELS]: (state: NovelStateType) => {
        return { ...state, isLoading: true };
    },
    [ACTION_TYPES.FETCH_NOVELS_OK]: (state: NovelStateType, action: Action<Array<Novel>>) => {
        return {
            ...state,
            data: action.payload,
            loadingFlag: false,
        };
    },
    [ACTION_TYPES.FETCH_NOVELS_NG]: (state: NovelStateType, action: Action<any>) => {
        return { ...state, loadingFlag: false };
    },
}, initialState);