const initialState = {
  toast: {},
  fcmToken: "",
  registerSuccess: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "TOAST": {
      return { ...state, toast: action.payload };
    }
    case "SET_FCMTOKEN": {
      return { ...state, fcmToken: action.payload };
    }
    case "REGISTER_SUCCESS": {
      return { ...state, registerSuccess: action.payload };
    }
    default:
      return state;
  }
}
