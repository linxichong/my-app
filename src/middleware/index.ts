import { Store } from "redux";
import { Action } from "redux-actions";

// 捕获Redux Action异常的中间件
export const reduxCatch = (errorHandler: Function) => (store: Store) => (next: Function) => (action: Action<{}>) => {
    try {
        // 异步Action被标记为出错时手动抛出异常
        if (action.error) {
            throw action.payload;
        }
        return next(action);
    } catch (err) {
        // 自定义的异常处理函数
        errorHandler(err, store.getState, action, store.dispatch);
        return err;
    }
}
