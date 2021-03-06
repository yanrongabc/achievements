import {
  PATH_DIALOG_HIDE,
  PATH_DIALOG_SHOW,
  PATH_GAPI_AUTHORIZED,
  PATH_PROBLEM_DIALOG_SHOW,
  PATH_SELECT,
  PATHS_JOINED_FETCH_SUCCESS
} from "./actions";
import {
  PATH_TOGGLE_JOIN_STATUS_FAIL,
  PATH_TOGGLE_JOIN_STATUS_REQUEST,
  PATH_TOGGLE_JOIN_STATUS_SUCCESS
} from "../Path/actions";

export const paths = (
  state = {
    selectedPathId: "",
    joinedPaths: {},
    ui: {
      dialog: {
        type: ""
      }
    }
  },
  action
) => {
  let status;
  switch (action.type) {
    case PATH_GAPI_AUTHORIZED:
      return {
        ...state,
        gapiAuthorized: action.status
      };
    case PATH_DIALOG_SHOW:
      return {
        ...state,
        ui: {
          ...state.ui,
          dialog: {
            type: "PathChange",
            value: action.pathInfo
          }
        }
      };
    case PATHS_JOINED_FETCH_SUCCESS: {
      return {
        ...state,
        joinedPaths: action.paths
      };
    }
    case PATH_TOGGLE_JOIN_STATUS_REQUEST:
      return {
        ...state,
        joinedPaths: {
          ...state.joinedPaths,
          loading: true
        }
      };
    case PATH_TOGGLE_JOIN_STATUS_FAIL:
      return {
        ...state,
        joinedPaths: { ...state.joinedPaths, loading: false }
      };
    case PATH_TOGGLE_JOIN_STATUS_SUCCESS:
      status = action.status;
      if (status === undefined) {
        status = !state.joinedPaths[action.pathId];
      }
      return {
        ...state,
        joinedPaths: {
          ...state.joinedPaths,
          [action.pathId]: status,
          loading: false
        }
      };
    case PATH_PROBLEM_DIALOG_SHOW:
      return {
        ...state,
        ui: {
          ...state.ui,
          dialog: {
            type: "ProblemChange",
            value: action.problemInfo
          }
        }
      };
    case PATH_DIALOG_HIDE:
      return {
        ...state,
        ui: {
          ...state.ui,
          dialog: {
            ...state.ui.dialog,
            type: ""
          }
        }
      };
    case PATH_SELECT:
      return {
        ...state,
        selectedPathId: action.pathId
      };
    default:
      return state;
  }
};
