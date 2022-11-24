const initialState = {
  toast: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "TOAST": {
      return { ...state, toast: action.payload };
    }
    default:
      return state;
  }
}
