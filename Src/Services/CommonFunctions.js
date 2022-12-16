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
      type: "error",
    },
  });
};

export const dispatchSuccessAction = (dispatch, message) => {
  dispatch({
    type: "TOAST",
    payload: {
      message: message,
      type: "success",
    },
  });
};

export const getFromDataJson = (mainArray, selectedData, keyName) => {
  let tempArray = [];
  selectedData.map((element, index) => {
    const temp = mainArray.filter((obj) => obj.name == element);
    console.log("temp--", temp);
    if (temp.length !== 0) {
      console.log("here");
      tempArray.push(keyName + "[" + index + "]");
      tempArray.push(temp[0].id);
    }
  });
  var ob2 = {};
  for (var i = 0; i < tempArray.length; i += 2) {
    ob2[tempArray[i]] = tempArray[i + 1];
  }
  return ob2;
};
