import { useNavigation } from "@react-navigation/native";
import moment from "moment";

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
  dispatch({ type: "PRE_LOADER_DELIVERY", payload: false });
  dispatch({
    type: "TOAST",
    payload: {
      message: message,
      type: "error",
    },
  });
};

export const dispatchSuccessAction = (dispatch, message) => {
  dispatch({ type: "PRE_LOADER_DELIVERY", payload: false });

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
    if (temp.length !== 0) {
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

export const getDataJsonAvailability = (data, keyname) => {
  let tempArray = [];
  data.map((element, index) => {
    tempArray.push(keyname + "[" + index + "]");
    tempArray.push(element[keyname]);
  });
  var ob2 = {};
  for (var i = 0; i < tempArray.length; i += 2) {
    ob2[tempArray[i]] = tempArray[i + 1];
  }
  return ob2;
};

export const simplifyDateTime = (date, flag) => {
  var DATE = moment(date);
  var REFERENCE = moment();
  var TODAY = REFERENCE.clone().startOf("day");
  var YESTERDAY = REFERENCE.clone().subtract(1, "days").startOf("day");

  if (flag === "time") {
    // If you want only time from date object
    return DATE.format("hh:mm A");
  } else if (flag === "date") {
    // If you want only date from date object
    if (DATE.isSame(REFERENCE, "week")) {
      // Check if date is today, yesterday, weekday or others
      if (DATE.isSame(TODAY, "d")) return DATE.format("hh:mm A");
      else if (DATE.isSame(YESTERDAY, "d")) return "Yesterday";
      else return DATE.format("dddd");
    } else return DATE.format("MM/DD/YYYY");
  } else {
    // If you want only date and time both from date object
    if (DATE.isSame(REFERENCE, "week")) {
      // Check if date is today, yesterday, weekday or others
      if (DATE.isSame(TODAY, "d")) return `Today ${DATE.format("hh:mm A")}`;
      else if (DATE.isSame(YESTERDAY, "d"))
        return `Yesterday ${DATE.format("hh:mm A")}`;
      else return DATE.format("dddd hh:mm A");
    } else return DATE.format("MM/DD/YYYY hh:mm A");
  }
};
