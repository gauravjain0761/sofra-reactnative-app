import { View, Text, StyleSheet, TextInput, I18nManager } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../Themes/Fonts";
import Colors from "../Themes/Colors";
import i18n from "../Config/I18n/I18n";
export default function LoginTextInput({
  name,
  placeholder,
  value,
  onChangeText,
  style,
}) {
  return (
    <View style={style}>
      <Text style={styles.name}>{name}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text)}
        style={[styles.input]}
        placeholderTextColor={Colors.black}
        secureTextEntry={name == "Password" ? true : false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    ...commonFontStyle(400, 16, Colors.pink),
    alignSelf: "flex-start",
    textAlign: "left",
    width: "100%",
  },
  input: {
    ...commonFontStyle(500, 14, Colors.black),
    backgroundColor: Colors.white,
    marginTop: hp(1.5),
    width: "100%",
    height: hp(6),
    paddingHorizontal: hp(3),
    borderRadius: 5,
    textAlign: I18nManager.isRTL ? "right" : "left",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.62,

    elevation: 4,
  },
});
