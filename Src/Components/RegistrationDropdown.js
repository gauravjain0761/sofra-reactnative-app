import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "../Themes/Colors";
import { commonFontStyle } from "../Themes/Fonts";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function RegistrationDropdown({
  setData,
  data,
  value,
  placeholder,
  valueField,
  style,
  placeholderTextColor,
}) {
  return (
    <View>
      <Dropdown
        // selectedStyle={{color:colors.gray3}}
        style={[styles.tradetypeviewStyle, style]}
        placeholderStyle={{
          ...commonFontStyle(
            400,
            14,
            placeholderTextColor
              ? placeholderTextColor
              : Colors.placeholderColor
          ),
        }}
        data={data}
        selectedTextStyle={[styles.TitleTextStyle]}
        iconColor={Colors.black}
        // activeColor={colors.Gray300}
        // disable ={runningTradeTypePositions[item.tradeType] && true}
        labelField={valueField}
        valueField={valueField}
        maxHeight={300}
        placeholder={placeholder}
        value={value}
        onChange={(item) => {
          console.log(item);
          setData(item[valueField]);
        }}
        renderItem={(item) => {
          return (
            <View>
              <Text style={styles.textItem}>{item[valueField]}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  placeholderStyle: {
    ...commonFontStyle(400, 14, Colors.placeholderColor),
  },
  TitleTextStyle: {
    ...commonFontStyle(400, 14, Colors.black),
  },
  tradetypeviewStyle: {
    backgroundColor: Colors.white,
    marginBottom: hp(2),
    width: "100%",
    height: hp(6),
    paddingHorizontal: hp(2),
    borderRadius: 5,
  },
  textItem: {
    ...commonFontStyle(400, 14, Colors.black),
    paddingVertical: hp(1),
    paddingHorizontal: hp(3),
  },
});
