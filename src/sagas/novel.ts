import { call, put, take, fork } from "redux-saga/effects";
import { queryNovels } from "../services/novelapi";
import { fetchNovels, fetchNovelsOK, fetchNovelsNG } from "../actions/novel";

export function* watchSearchNovels() {
  while (true) {
    yield take(fetchNovels);
    try {
      const data = yield call(queryNovels);
      yield put(fetchNovelsOK(data.novel));
    } catch (error) {
      yield put(fetchNovelsNG(error));
    }
  }
}
