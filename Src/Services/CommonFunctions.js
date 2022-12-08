import { useNavigation } from "@react-navigation/native";

export const validateEmail = (email) => {
  let re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const hasArabicCharacters = (text) => {
  var arregex = /[\u0600-\u06FF]/;
  return arregex.test(text);
};

export const dispatchAction = (dispatch, actionType, data) => {
  dispatch({
    type: actionType,
    payload: data,
  });
};

export const dispatchErrorAction = (dispatch, message) => {
  dispatch({
    type: "TOAST",
    payload: {
      message: message,
      // message2: message,
      type: "error",
    },
  });
};

export const dispatchSuccessAction = (dispatch, message) => {
  dispatch({
    type: "TOAST",
    payload: {
      message: message,
      // message2: message,
      type: "success",
    },
  });
};
