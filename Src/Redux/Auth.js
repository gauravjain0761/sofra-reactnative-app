const initialState = {
  toast: {},
  fcmToken: "",
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "TOAST": {
      return { ...state, toast: action.payload };
    }
    case "SET_FCMTOKEN": {
      return { ...state, fcmToken: action.payload };
    }
    default:
      return state;
  }
}
