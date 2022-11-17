const initialState = {
  preLoader: false,
  toast: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case 'PRE_LOADER': {
      return {...state, preLoader: action.payload.preLoader};
    }
    case 'TOAST': {
      return {...state, toast: action.payload};
    }
    default:
      return state;
  }
}
