import { ACTION_TYPES } from '../constants'
import { createActions } from "redux-actions";

// 普通 Action
const { fetchNovels, fetchNovelsOK, fetchNovelsNG } = createActions(
    ACTION_TYPES.FETCH_NOVELS,
    ACTION_TYPES.FETCH_NOVELS_OK,
    ACTION_TYPES.FETCH_NOVELS_NG
)

// 异步 Action
export const searchNovels = (url: string) => (
    (dispatch: any) => {
        dispatch(fetchNovels()); // {type: 'FETCH_NOVELS'}
        callApi(url).then(
            json => dispatch(fetchNovelsOK(json)), // {type: 'FETCH_NOVELS_OK', payload: json}
            error => dispatch(fetchNovelsNG(error)) // {type: 'FETCH_NOVELS_NG', payload: error, error: true}
        )
    }
);