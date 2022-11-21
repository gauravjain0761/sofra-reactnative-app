import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import Colors from "../Themes/Colors";
import { commonFontStyle, SCREEN_WIDTH } from "../Themes/Fonts";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function OrderItems({ item, navigation }) {
  return (
    <View>
      <View style={styles.mainCardView}>
        <View style={styles.leftView}>
          <Image
            style={styles.resImage}
            source={require("../Images/Merchant/xxxhdpi/foodDish.jpeg")}
          />
        </View>
        <View style={styles.RightView}>
          <View>
            <Text style={styles.name} numberOfLines={1}>
              B.B.Q Plater
            </Text>
            <Text style={styles.type}>Breakfast, Lunch, Dinner</Text>
            <Text style={styles.name}>AED 75.00</Text>
            <Image
              style={styles.truckLogo}
              source={require("../Images/Merchant/xxxhdpi/ic_car.png")}
            />
          </View>
          <View>
            <TouchableOpacity
              style={{
                borderRadius: 3,
                overflow: "hidden",
                alignSelf: "flex-end",
              }}
            >
              <Text style={[styles.tagText, { backgroundColor: item.color }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.line}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainCardView: {
    flexDirection: "row",
  },
  leftView: {
    paddingHorizontal: hp(2),
  },
  RightView: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: SCREEN_WIDTH - hp(26),
  },
  resImage: {
    width: hp(20),
    height: hp(16),
    resizeMode: "cover",
    borderRadius: 10,
  },
  line: {
    height: 1,
    backgroundColor: Colors.placeholderColor,
    marginVertical: hp(2),
  },
  truckLogo: {
    width: hp(4),
    height: hp(4),
    resizeMode: "contain",
    marginVertical: 5,
  },
  tagText: {
    paddingVertical: 8,
    paddingHorizontal: 13,
    ...commonFontStyle(500, 13, Colors.white),
  },
  name: {
    ...commonFontStyle(600, 14, Colors.black),
  },
  type: {
    ...commonFontStyle(500, 11, Colors.tabIconColor),
    paddingVertical: 5,
  },
});
