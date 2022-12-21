import { merchant_url } from "../Config/AppConfig";
import { getToken } from "./asyncStorage";
import {
  dispatchAction,
  dispatchErrorAction,
  dispatchSuccessAction,
} from "./CommonFunctions";
import { GET, POST } from "./ResponseHandler";

export const getCities = () => async (dispatch) => {
  const url = merchant_url + "/getCities";
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_CITIES", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getCuisines = () => async (dispatch) => {
  const url = merchant_url + "/getCuisines";
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_CUISINES", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getCategories = () => async (dispatch) => {
  const url = merchant_url + "/getCategories";
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_CATEGORIES", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getUsers = () => async (dispatch) => {
  const url = merchant_url + "/getUsers";
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_USERS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getOrders = () => async (dispatch) => {
  let token = await getToken();
  const url = merchant_url + "/getOrders?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      // onSuccess();
      dispatchAction(dispatch, "SET_ORDERS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getStatitics = () => async (dispatch) => {
  let token = await getToken();
  const url = merchant_url + "/getStatitics?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      // onSuccess();
      dispatchAction(dispatch, "SET_STATISTICS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getSettledReports = () => async (dispatch) => {
  let token = await getToken();
  const url = merchant_url + "/getSettledReports?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      // onSuccess();
      dispatchAction(dispatch, "SET_SETTELED_REPORT", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getUnSettledReports = () => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  let token = await getToken();
  const url = merchant_url + "/getUnSettledReports?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      // onSuccess();
      dispatchAction(dispatch, "SET_UNSETTELED_REPORT", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getAppSetting = () => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  let token = await getToken();
  const url = merchant_url + "/getAppSetting?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_APP_SETTING", data);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const UpdateAppSetting = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/UpdateAppSetting";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "SET_APP_SETTING", data);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getAvailbility = () => async (dispatch) => {
  let token = await getToken();
  const url = merchant_url + "/getAvailbility?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_AVAILABILITY", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const updateAvailbility = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/updateAvailbility";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      // dispatchAction(dispatch, "DELETE_OFFER", postObj);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getOffers = () => async (dispatch) => {
  let token = await getToken();
  const url = merchant_url + "/getOffers?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_OFFERS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const DeleteOffer = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/DeleteOffer";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "DELETE_OFFER", postObj);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const AddOffer = (postObj, onSuccess) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/AddOffer";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      onSuccess();
      dispatch(getOffers());
      dispatchSuccessAction(dispatch, data.message);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getDashboardReports = () => async (dispatch) => {
  // dispatch({ type: "PRE_LOADER", payload: true });

  let token = await getToken();
  const url = merchant_url + "/getDashboardReports?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_DASHBOARD_DATA", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getMenuCategories = () => async (dispatch) => {
  let token = await getToken();
  const url = merchant_url + "/getMenuCategories?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_MENU_CATEGORIES", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const EditMenuCategory = (postObj, navigation) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/EditMenuCategory";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      navigation.goBack();
      dispatchAction(dispatch, "SET_MENU_CATEGORIES", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const DeleteMenuCategory = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });
  const url = merchant_url + "/DeleteMenuCategory";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "DELETE_CATEGORIES", postObj);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const AddMenuCategory = (postObj, onSuccess) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/AddMenuCategory";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "SET_MENU_CATEGORIES", data.result);
      onSuccess();
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getMenuItems = () => async (dispatch) => {
  let token = await getToken();
  const url = merchant_url + "/getMenuItems?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_MENU_ITEMS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getMenuDescriptors = () => async (dispatch) => {
  let token = await getToken();
  const url = merchant_url + "/getMenuDescriptors?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_MENU_DESCRIPTORS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const AddMenuItem = (postObj, navigation) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/AddMenuItem";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatch(getMenuItems());
      dispatchSuccessAction(dispatch, data.message);
      // dispatchAction(dispatch, "SET_MENU_CATEGORIES", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const EditMenuItem = (postObj, navigation) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/EditMenuItem";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      navigation.navigate("M_MenuItemScreen");
      dispatch(getMenuItems());
      dispatchSuccessAction(dispatch, data.message);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const DeleteMenuItem = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });
  const url = merchant_url + "/DeleteMenuItem";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "DELETE_MENUITEMS", postObj);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const enableDisableMenues = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });
  const url = merchant_url + "/enableDisableMenues";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "STATUS_UPDATE_MENU_ITEMS", postObj);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const changePromoCodeStatus = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });
  const url = merchant_url + "/changePromoCodeStatus";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.error == "false" || data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "PROMOCODE_STATUS_UPDATE", postObj);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getPromoCodes = () => async (dispatch) => {
  let token = await getToken();
  const url = merchant_url + "/getPromoCodes?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_PROMO_CODES", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const AddPromoCode = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/AddPromoCode";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatch(getPromoCodes());
      // dispatchAction(dispatch, "ADD_OFF_SLOT", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getOffSlots = () => async (dispatch) => {
  let token = await getToken();
  const url = merchant_url + "/getOffSlots?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_OFF_SLOT", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const deleteOffSlot = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/deleteOffSlot";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "DELETE_SLOT", postObj);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const addOffSlot = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/addOffSlot";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "ADD_OFF_SLOT", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getRestaurnatDetails = () => async (dispatch) => {
  let token = await getToken();
  const url = merchant_url + "/getRestaurnatDetails?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_RESTAURANT", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const updateProfile = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/updateProfile";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatch(getRestaurnatDetails());
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getDocuments = () => async (dispatch) => {
  let token = await getToken();
  const url = merchant_url + "/getDocuments?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_DOCUMENTS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const AddDocument = (postObj, onSuccess) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/AddDocument";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      onSuccess();
      dispatch(getDocuments());
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const deleteDocument = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/deleteDocument";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "DELETE_DOCUMENT", postObj);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const changeStatus =
  (postObj, selectedStatus, onSuccess) => async (dispatch) => {
    dispatch({ type: "PRE_LOADER", payload: true });

    const url = merchant_url + "/changeStatus";
    try {
      const data = await POST(dispatch, url, postObj);
      if (data.status == true) {
        // dispatchSuccessAction(dispatch, data.message);
        onSuccess(data.message);
        dispatchAction(dispatch, "UPDATE_ORDER_STATUS", {
          postObj,
          selectedStatus,
        });
      } else {
        dispatchErrorAction(dispatch, data.message);
      }
    } catch (error) {
      dispatchErrorAction(dispatch, "Something went wrong!");
    }
  };
