let initialState = {
  isLoading: false,
  isError: false,
  data: [],
  total: 0,
  errorMessage: "",
};

function reducer(state = initialState, action) {
  var { data, total } = state;

  switch (action.type) {
    case "FETCH_DATA_REQUEST":
      return {
        ...state,
        isLoading: true,
        isError: null,
        errorMessage: "",
      };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.users,
        total: action.payload.total,
      };
    case "FETCH_DATA_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload.message,
      };
    default:
      return state;
  }
}

export default reducer;
