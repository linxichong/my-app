import { createStore, applyMiddleware, combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { novelReducer } from "../reducers/novel";
import { createLogger } from "redux-logger";
import { reduxCatch } from "../middleware";
import createSagaMiddleware from "redux-saga";
import { watchSearchNovels } from "../sagas/novel";

// 状态变化记录中间件
const loggerMiddleware = createLogger();
// 浏览器history对象
export const history = createBrowserHistory();
// saga 中间件
const sagaMiddleware = createSagaMiddleware();

// 将各种reducer合并为一个根reducer
const rootReducer = combineReducers({
  novel: novelReducer,
  // 将路由与浏览器历史关联
  router: connectRouter(history)
});

// 定义应用程序状态树的结构类型
// 通过rootReducer 推断状态形状
export type AppStateType = ReturnType<typeof rootReducer>;

// 创建store
export const store = createStore(
  // 跟reducer
  rootReducer,
  // 应用中间件
  applyMiddleware(
    sagaMiddleware,
    routerMiddleware(history),
    loggerMiddleware,
    reduxCatch((error: Error) => {
      console.error("Redux Action 调用出错了");
      console.error(error);
    })
  )
);
// 启动 saga
sagaMiddleware.run(watchSearchNovels);
