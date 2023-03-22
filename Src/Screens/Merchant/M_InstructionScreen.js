import { I18nManager, StyleSheet, Text, View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
// https://www.mysofra.com/merchant-tutorial
export default function M_InstructionScreen() {
  return (
    <View
      style={{
        flex: 1,
        height: heightPercentageToDP(100),
        width: widthPercentageToDP(100),
      }}
    >
      <WebView
        style={{
          flex: 1,
          height: heightPercentageToDP(100),
          width: widthPercentageToDP(100),
        }}
        source={{ uri: I18nManager.isRTL ? "https://www.mysofra.com/merchant-tutorial-ar"  : "https://www.mysofra.com/merchant-tutorial" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
