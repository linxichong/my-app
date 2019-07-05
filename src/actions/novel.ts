import { ACTION_TYPES } from "../constants";
import { createAction } from "redux-actions";
import { queryNovels } from "../services/novelapi";
import { Dispatch } from "redux";

// 普通 Action
export const fetchNovels = createAction(ACTION_TYPES.FETCH_NOVELS); // {type: 'FETCH_NOVELS'}
export const fetchNovelsOK = createAction(ACTION_TYPES.FETCH_NOVELS_OK); // {type: 'FETCH_NOVELS_OK', payload: json}
export const fetchNovelsNG = createAction(ACTION_TYPES.FETCH_NOVELS_NG); // {type: 'FETCH_NOVELS_NG', payload: error, error: true}

// // 异步 Action
// export const searchNovels = () => (dispatch: Dispatch) => {
//   dispatch(fetchNovels()); // {type: 'FETCH_NOVELS'}
//   queryNovels().then(resp => {
//     if (resp.isAxiosError) {
//       dispatch(fetchNovelsNG(resp)); // {type: 'FETCH_NOVELS_NG', payload: error, error: true}
//     } else {
//       dispatch(fetchNovelsOK(resp.novel)); // {type: 'FETCH_NOVELS_OK', payload: json}
//     }
//   });
// };
