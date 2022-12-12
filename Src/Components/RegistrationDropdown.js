import { View, StyleSheet, Text, Image } from "react-native";
import React from "react";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
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
  multiSelect,
}) {
  console.log("value---", value);
  return (
    <View>
      {multiSelect && multiSelect == true ? (
        <MultiSelect
          // selectedStyle={{color:colors.gray3}}
          style={[styles.tradetypeviewStyle, style]}
          placeholderStyle={{
            ...commonFontStyle(
              400,
              14,
              value.length !== 0
                ? Colors.black
                : placeholderTextColor
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
          placeholder={value.length !== 0 ? value.toString() : placeholder}
          value={value}
          onChange={(item) => {
            setData(item);
          }}
          renderItem={(item, selected) => {
            return (
              <View style={styles.selectedItemsDropdown}>
                <Text style={styles.textItem2}>{item[valueField]}</Text>
                {selected && (
                  <Image
                    source={require("../Images/Merchant/xxxhdpi/tick.png")}
                    style={styles.tickIcon}
                  />
                )}
              </View>
            );
          }}
          renderSelectedItem={(item) => {
            return <></>;
          }}
        />
      ) : (
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
      )}
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
  textItem2: {
    ...commonFontStyle(400, 14, Colors.black),
  },
  selectedItemsDropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: hp(1),
    paddingHorizontal: hp(3),
    alignItems: "center",
  },
  tickIcon: {
    resizeMode: "contain",
    height: 12,
    width: 12,
  },
});
