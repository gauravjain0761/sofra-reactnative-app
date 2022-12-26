import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../Themes/Fonts";
import Colors from "../Themes/Colors";
import moment from "moment";

export default function DateTimePickerView({
  value,
  format,
  placeHolder,
  onPressPicker,
  width,
}) {
  return (
    <TouchableOpacity
      onPress={() => onPressPicker()}
      style={[styles.input, { width: width }]}
    >
      <Text style={value ? styles.timeText : styles.placeHolder}>
        {value !== "" ? moment(value).format(format) : placeHolder}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.white,
    marginBottom: hp(2),
    width: "100%",
    height: hp(6),
    paddingHorizontal: hp(2),
    borderRadius: 5,
    justifyContent: "center",
  },
  timeText: {
    ...commonFontStyle(400, 14, Colors.black),
  },
  placeHolder: {
    ...commonFontStyle(400, 14, Colors.placeholderColor),
  },
});
