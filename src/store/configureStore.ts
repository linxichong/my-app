import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'
import { NovelStateType, novelReducer } from '../reducers/novel';
import { createLogger } from 'redux-logger'
import { reduxCatch } from "../middleware";

// 状态变化记录中间件
const loggerMiddleware = createLogger()
// 浏览器history对象
export const history = createBrowserHistory();
// 定义应用程序状态树的结构类型
export type AppStateType = {
    // 路由状态
    router: RouterState;
    novel: NovelStateType;
}

// 将各种reducer合并为一个根reducer
const rootReducer = combineReducers({
    novel: novelReducer,
    // 将路由与浏览器历史关联
    router: connectRouter(history),
})

// 创建store
export const store = createStore(
    // 跟reducer
    rootReducer,
    // 应用中间件
    applyMiddleware(
        thunk,
        routerMiddleware(history),
        loggerMiddleware,
        reduxCatch((error: any, getState: any, lastAction: any, dispatch: any) => {
            console.error('Redux Action 调用出错了');
            console.error(error);
        })
    )
)