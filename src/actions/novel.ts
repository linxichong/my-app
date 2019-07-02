import { ACTION_TYPES } from "../constants";
import { createAction } from "redux-actions";
import { queryNovels } from "../services/novelapi";
import { Dispatch } from "redux";

// 普通 Action
const fetchNovels = createAction(ACTION_TYPES.FETCH_NOVELS);
const fetchNovelsOK = createAction(ACTION_TYPES.FETCH_NOVELS_OK);
const fetchNovelsNG = createAction(ACTION_TYPES.FETCH_NOVELS_NG);

// 异步 Action
export const searchNovels = () => (dispatch: Dispatch) => {
  dispatch(fetchNovels()); // {type: 'FETCH_NOVELS'}
  queryNovels().then(resp => {
    if (resp.isAxiosError) {
      dispatch(fetchNovelsNG(resp)); // {type: 'FETCH_NOVELS_NG', payload: error, error: true}
    } else {
      dispatch(fetchNovelsOK(resp.novel)); // {type: 'FETCH_NOVELS_OK', payload: json}
    }
  });
};
