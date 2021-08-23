const initialState = {
  number: 0,
};

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "increase":
      return {
        ...state,
        number: state.number + 1,
      };
    case "decrease":
      return {
        ...state,
        number: state.number - 1,
        // number: state.number === 0 ? state.number : state.number - 1,
      };

    default:
      return state;
  }
};
