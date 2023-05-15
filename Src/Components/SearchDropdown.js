import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import Colors from "../Themes/Colors";
import { commonFontStyle } from "../Themes/Fonts";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { dateFilterData } from "../Config/StaticDropdownData";
import { strings } from "../Config/I18n";
export default function SearchDropdown({
  setData,
  data,
  value,
  placeholder,
  valueField,
  style,
  placeholderTextColor,
  multiSelect,
  labelField,
  onSearch,
}) {
  return (
    <View style={styles.row}>
      <Dropdown
        style={[styles.tradetypeviewStyle, style]}
        placeholderStyle={{
          textAlign: "left",
          ...commonFontStyle(
            400,
            14,
            placeholderTextColor
              ? placeholderTextColor
              : Colors.placeholderColor
          ),
        }}
        data={dateFilterData}
        selectedTextStyle={[styles.TitleTextStyle]}
        iconColor={Colors.black}
        labelField={labelField ? labelField : valueField}
        valueField={valueField}
        maxHeight={300}
        placeholder={placeholder}
        value={value}
        onChange={(item) => {
          setData(item[valueField]);
        }}
        renderRightIcon={() => <></>}
        renderItem={(item) => {
          return (
            <View>
              <Text style={styles.textItem}>
                {item[labelField ? labelField : valueField]}
              </Text>
            </View>
          );
        }}
      />
      <TouchableOpacity onPress={() => onSearch()} style={styles.pinkBUtton}>
        <Text style={styles.searchText}>
          {strings("statisticsScreen.search")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholderStyle: {
    ...commonFontStyle(400, 14, Colors.placeholderColor),
    textAlign: "left",
  },
  TitleTextStyle: {
    ...commonFontStyle(400, 14, Colors.black),
    textAlign: "left",
  },
  tradetypeviewStyle: {
    backgroundColor: Colors.white,
    flex: 1,
    height: hp(6),
    // marginLeft: hp(2),
    borderRadius: 5,
  },
  textItem: {
    ...commonFontStyle(400, 14, Colors.black),
    paddingVertical: hp(1),
    paddingHorizontal: hp(3),
    textAlign: "left",
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

  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingLeft: hp(2),
    borderRadius: 8,
    marginVertical: hp(2),
    justifyContent: "space-between",
    overflow: "hidden",
  },
  searchIcon2: { height: hp(3), width: hp(3), resizeMode: "contain" },
  searchIcon: {
    height: hp(2.5),
    width: hp(2.5),
    resizeMode: "contain",
  },

  pinkBUtton: {
    backgroundColor: Colors.pink,
    // flex: 1,
    height: hp(6),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: hp(1.5),
  },
  searchText: {
    ...commonFontStyle(400, 14, Colors.white),
  },
});
