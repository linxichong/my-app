import { call, put, take } from "redux-saga/effects";
import { queryNovels } from "../../services/novelapi";
import { fetchNovels, fetchNovelsOK, fetchNovelsNG } from "../actions/novel";

export function* watchSearchNovels() {
  // 无限循环保证 saga 一直在后台运行监视
  while (true) {
    // 阻塞直到 fetchNovels Action发起
    yield take(fetchNovels);
    try {
      // 异步调用
      const data = yield call(queryNovels);
      // 通知store发起fetchNovelsOK操作
      yield put(fetchNovelsOK(data.novel));
    } catch (error) {
      // 通知store发起fetchNovelsNG操作
      yield put(fetchNovelsNG(error));
    }
  }
}
