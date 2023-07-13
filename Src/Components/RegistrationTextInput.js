import { View, StyleSheet, TextInput, I18nManager } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../Themes/Fonts";
import Colors from "../Themes/Colors";

export default function RegistrationTextInput({
  name,
  placeholder,
  value,
  onChangeText,
  style,
  placeholderTextColor,
  keyboardType,
  maxLength,
  onFocus,
  editable,
}) {
  return (
    <View style={style}>
      <TextInput
        maxLength={maxLength ? maxLength : undefined}
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text)}
        style={[styles.input]}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : Colors.placeholderColor
        }
        editable={editable == undefined ? true : false}
        keyboardType={keyboardType ? keyboardType : "default"}
        onPressIn={() => (onFocus ? onFocus() : {})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    ...commonFontStyle(400, 14, Colors.black),
    backgroundColor: Colors.white,
    marginBottom: hp(2),
    width: "100%",
    height: hp(6),
    paddingHorizontal: hp(2),
    borderRadius: 5,
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
});
