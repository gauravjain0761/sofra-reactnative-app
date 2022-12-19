import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Colors from "../Themes/Colors";
import { commonFontStyle } from "../Themes/Fonts";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function PinkButton({
  style,
  name,
  onPress,
  buttonTextStyle,
  text,
}) {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[styles.buttonView, style]}
    >
      {text == "small" ? (
        <Text style={[styles.textSmall, buttonTextStyle]}>{name}</Text>
      ) : (
        <Text style={[styles.text, buttonTextStyle]}>{name}</Text>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: Colors.pink,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(2),
    borderRadius: 5,
  },
  text: {
    ...commonFontStyle(400, 18, Colors.white),
  },
  textSmall: {
    ...commonFontStyle(500, 16, Colors.white),
  },
});
