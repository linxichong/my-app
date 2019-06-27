import { ACTION_TYPES } from '../constants'
import { createAction } from "redux-actions";
import { callApi } from "../services/api";

// 普通 Action
// const { fetchNovels, fetchNovelsOK, fetchNovelsNG } = createActions(
//     ACTION_TYPES.FETCH_NOVELS,
//     ACTION_TYPES.FETCH_NOVELS_OK,
//     ACTION_TYPES.FETCH_NOVELS_NG
// );

const fetchNovels = createAction(ACTION_TYPES.FETCH_NOVELS);
const fetchNovelsOK = createAction(ACTION_TYPES.FETCH_NOVELS_OK);
const fetchNovelsNG = createAction(ACTION_TYPES.FETCH_NOVELS_NG);

// 异步 Action
export const searchNovels = (url: string) => (
    (dispatch: any) => {
        dispatch(fetchNovels()); // {type: 'FETCH_NOVELS'}
        callApi(url).then(
            json => dispatch(fetchNovelsOK(json)), // {type: 'FETCH_NOVELS_OK', payload: json}
            error => {
                dispatch(fetchNovelsNG(error)) // {type: 'FETCH_NOVELS_NG', payload: error, error: true}
            }
        )
    }
);