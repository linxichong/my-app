import { ACTION_TYPES } from "../constants";
import { createAction } from "redux-actions";

// 普通 Action
export const fetchNovels = createAction(ACTION_TYPES.FETCH_NOVELS); // {type: 'FETCH_NOVELS'}
export const fetchNovelsOK = createAction(ACTION_TYPES.FETCH_NOVELS_OK); // {type: 'FETCH_NOVELS_OK', payload: json}
export const fetchNovelsNG = createAction(ACTION_TYPES.FETCH_NOVELS_NG); // {type: 'FETCH_NOVELS_NG', payload: error, error: true}
