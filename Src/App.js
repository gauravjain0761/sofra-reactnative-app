import "./Config";
import React, { useEffect, useState, useCallback, useRef } from "react";
import RootContainer from "./Navigation/RootContainer";
import {
  View,
  Text,
  TextInput,
  LogBox,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import ApplicationStyles from "./Themes/ApplicationStyles";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import Colors from "./Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "./Themes/Fonts";
import DeleteModal from "./Components/DeleteModal";

function App() {
  const _TOAST = useSelector((e) => e.merchant.toast);
  const preLoader = useSelector((e) => e.merchant.preLoader);
  const DpreLoader = useSelector((e) => e.delivery.preLoader);
  const isVisible = useSelector((e) => e.merchant.isVisible);
  const onDelete = useSelector((e) => e.merchant.onDelete);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "TOAST", payload: "initial" });
    LogBox.ignoreAllLogs(true);
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
  }, []);

  useEffect(() => {
    /**
     * Toast message display
     */
    if (_TOAST && _TOAST.hasOwnProperty("message")) {
      Toast.show({
        text1: _TOAST.message,
        text2: _TOAST.message2,
        type: _TOAST.type,
      });
    }
  }, [_TOAST]);

  const toastConfig = {
    success: ({ text1, text2, type, props, ...rest }) =>
      type === "success" && (
        <View style={styles.textStyleToastSuccess}>
          <Text style={styles.textStyleToast}>{text1}</Text>
          {/* <Text style={styles.textStyleToast}>{text2}</Text> */}
        </View>
      ),
    error: ({ text1, text2, type, props, ...rest }) =>
      type === "error" && (
        <View style={styles.toastStyle}>
          <Text style={styles.textStyleToast}>{text1}</Text>
          {/* <Text style={styles.textStyleToast}>{text2}</Text> */}
        </View>
      ),
    // info: () => {},
    // any_custom_type: () => {},
  };

  return (
    <View style={ApplicationStyles.applicationView}>
      <RootContainer />
      <Toast
        position={"bottom"}
        config={toastConfig}
        ref={(ref) => Toast.setRef(ref)}
      />
      {/* {preLoader && (
        <View style={styles.loaderView}>
          <ActivityIndicator size={"large"} color={Colors.black} />
        </View>
      )}
      {DpreLoader && (
        <View style={styles.loaderView}>
          <ActivityIndicator size={"large"} color={Colors.black} />
        </View>
      )} */}
      <DeleteModal
        isVisible={isVisible}
        onDelete={() => {
          onDelete(),
            dispatch({ type: "DELETE_MODAL", payload: { isVisible: false } });
        }}
        onClose={() =>
          dispatch({ type: "DELETE_MODAL", payload: { isVisible: false } })
        }
      />
    </View>
  );
}
export default App;

const styles = StyleSheet.create({
  toastStyle: {
    backgroundColor: "white",
    paddingVertical: hp(1.8),
    width: Dimensions.get("window").width - hp(8),
    borderRadius: 5,
    borderLeftWidth: 6,
    borderLeftColor: "red",
  },
  textStyleToastSuccess: {
    backgroundColor: "white",
    paddingVertical: hp(1.8),
    width: Dimensions.get("window").width - hp(8),
    borderRadius: 5,
    borderLeftWidth: 6,
    borderLeftColor: "green",
  },
  textStyleToast: {
    ...commonFontStyle(500, 14, Colors.black),
    marginLeft: hp(2),
  },
  loaderView: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
  },
});
