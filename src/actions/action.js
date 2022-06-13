import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from "./actionType";


export const fetchDataRequest = () => {
    return {
        type: FETCH_DATA_REQUEST,
    }
}

export const fetchDataSuccess = (item) => {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: {
            users: item,
            total: item.total,
        }
    }
}

export const fetchDataFailure = (error) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: {
        message: error,
    }
  };
};