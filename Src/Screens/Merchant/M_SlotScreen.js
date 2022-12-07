import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import React, { useState } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import { Dropdown } from "react-native-element-dropdown";
import PinkButton from "../../Components/PinkButton";
import CheckBox from "@react-native-community/checkbox";
import { Calendar, LocaleConfig } from "react-native-calendars";
export default function M_SlotScreen() {
  LocaleConfig.locales["fr"] = {
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    monthNamesShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    dayNames: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    today: "Aujourd'hui",
  };
  LocaleConfig.defaultLocale = "fr";
  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>Off Slots</Text>
        <View style={styles.whiteView}>
          <Calendar style={styles.calender} enableSwipeMonths={true} />
          <TouchableOpacity>
            <Text style={styles.button}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.button}>Clear</Text>
          </TouchableOpacity>
        </View>
        <PinkButton
          style={styles.btn}
          name={"Submit"}
          text={"small"}
          onPress={() => {}}
        />
        <Text style={styles.mainTitle}>All Off Slots</Text>
        {[0, 1, 2].map((item, index) => {
          return (
            <View style={styles.itemList}>
              <View style={styles.row}>
                <Text style={styles.leftText}>SR</Text>
                <Text style={styles.rightText}>1</Text>
              </View>
              <View style={styles.middleRow}>
                <Text style={styles.leftText}>Off Slot Date</Text>
                <Text style={styles.rightText}>October 24, 2022</Text>
              </View>
              <View style={styles.middleRow2}>
                <Text style={styles.leftText}>Created</Text>
                <Text style={styles.rightText}>10/18/22, 12:00 AM</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.leftText}>Action</Text>
                <Image
                  source={require("../../Images/Merchant/xxxhdpi/ic_del.png")}
                  style={styles.searchIcon}
                />
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  welcomeText: {
    ...commonFontStyle("M_500", 18, Colors.pink),
    marginTop: 5,
    marginBottom: hp(3),
    textAlign: "center",
  },
  whiteView: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    overflow: "hidden",
  },
  calender: {
    backgroundColor: Colors.white,
  },
  button: {
    ...commonFontStyle("M_500", 16, Colors.black),
    textAlign: "center",
    paddingVertical: hp(2),
  },
  btn: {
    marginVertical: hp(3),
  },
  itemList: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: hp(1.5),
  },
  row: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: hp(1.8),
    paddingHorizontal: hp(2),
  },
  middleRow: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: hp(1.8),
    paddingHorizontal: hp(2),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: Colors.backgroundScreen,
    borderBottomColor: Colors.backgroundScreen,
  },
  middleRow2: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: hp(1.8),
    paddingHorizontal: hp(2),
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    // borderTopColor: Colors.backgroundScreen,
    borderBottomColor: Colors.backgroundScreen,
  },
  leftText: {
    ...commonFontStyle(400, 13, Colors.black),
  },
  rightText: {
    ...commonFontStyle(400, 13, Colors.grayButtonBackground),
  },
  mainTitle: {
    ...commonFontStyle(500, 18, Colors.black),
    marginBottom: hp(2.5),
  },
  searchIcon: {
    height: hp(2),
    width: hp(2),
    resizeMode: "contain",
  },
});
