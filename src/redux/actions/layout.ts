import { ACTION_TYPES } from "../../constants";
import { createAction } from "redux-actions";

export const toggleSideBar = createAction(ACTION_TYPES.TOGGLE_SIDEBAR); // {type: 'TOGGLE_SIDEBAR'}