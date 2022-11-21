import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
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

const daysData = [
  {
    checkbox: false,
    open: "12:00",
    close: "10:55",
    day: "Sunday",
  },
  { checkbox: false, open: "12:00", close: "10:55", day: "Monday" },
  { checkbox: false, open: "12:00", close: "10:55", day: "Tuesday" },
  { checkbox: false, open: "12:00", close: "10:55", day: "Wednesday" },
  { checkbox: false, open: "12:00", close: "10:55", day: "Thursday" },
  { checkbox: false, open: "12:00", close: "10:55", day: "Friday" },
  { checkbox: false, open: "12:00", close: "10:55", day: "Saturday" },
];
export default function M_UpdateAvailability() {
  const [everydayEnable, seteverydayEnable] = useState(false);
  const [sameTimingEnable, setsameTimingEnable] = useState(false);
  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>Update Availabilites</Text>
        <Text style={styles.title}>Update Availabilites Here</Text>

        <View style={styles.row1}>
          <TouchableOpacity
            onPress={() => seteverydayEnable(!everydayEnable)}
            style={styles.row1}
          >
            <Image
              style={styles.checkIcon}
              source={
                everydayEnable
                  ? require("../../Images/Merchant/xxxhdpi/ic_check.png")
                  : require("../../Images/Merchant/xxxhdpi/ic_uncheck.png")
              }
            />
            <Text style={styles.nameText}>Everday</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setsameTimingEnable(!sameTimingEnable)}
            style={[styles.row1, { marginLeft: hp(2) }]}
          >
            <Image
              style={styles.checkIcon}
              source={
                sameTimingEnable
                  ? require("../../Images/Merchant/xxxhdpi/ic_check.png")
                  : require("../../Images/Merchant/xxxhdpi/ic_uncheck.png")
              }
            />
            <Text style={styles.nameText}>Apply Same Timings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mainTable}>
          <View style={styles.row1}>
            <View style={{ flex: 1 }}>
              <Text style={styles.tableTitlea}>Days</Text>
            </View>
            <View style={styles.timeBox}>
              <Text style={styles.tableTitlea}>Open</Text>
            </View>
            <View style={styles.timeBox}>
              <Text style={styles.tableTitlea}>Close</Text>
            </View>
          </View>
          {daysData.map((item, index) => {
            return (
              <View style={styles.rowDays}>
                <TouchableOpacity style={styles.dayRowView}>
                  <Image
                    style={styles.checkIcon}
                    source={
                      item.checkbox
                        ? require("../../Images/Merchant/xxxhdpi/ic_check.png")
                        : require("../../Images/Merchant/xxxhdpi/ic_uncheck.png")
                    }
                  />
                  <Text style={styles.nameText}>{item.day}</Text>
                </TouchableOpacity>
                <View style={styles.timeBox}>
                  <Text style={{ ...commonFontStyle(400, 14, Colors.black) }}>
                    {item.open}
                  </Text>
                </View>
                <View style={styles.timeBox}>
                  <Text style={{ ...commonFontStyle(400, 14, Colors.black) }}>
                    {item.close}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <PinkButton
          onPress={() => {}}
          style={styles.dbuttonStyle}
          text={"small"}
          name={"Update Availability"}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  welcomeText: {
    ...commonFontStyle(400, 18, Colors.pink),
    marginTop: 5,
    marginBottom: hp(3),
    textAlign: "center",
  },
  title: {
    ...commonFontStyle(600, 18, Colors.black),
    marginBottom: hp(1.5),
    marginTop: hp(2),
  },
  row1: {
    alignItems: "center",
    flexDirection: "row",
  },
  rowDays: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.white,
    marginBottom: hp(1.5),
    paddingVertical: 8,
  },
  checkIcon: {
    height: hp(2.8),
    width: hp(2.8),
    resizeMode: "contain",
    marginRight: 10,
  },
  dayRowView: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: hp(1),
    // backgroundColor: "pink",
    flex: 1,
  },
  nameText: {
    ...commonFontStyle(400, 15, Colors.grayButtonBackground),
  },
  timeBox: {
    marginRight: hp(2),
    backgroundColor: Colors.registrationBackground,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  tableTitlea: {
    ...commonFontStyle(500, 15, Colors.black),
  },
  mainTable: {
    marginVertical: hp(5),
  },
  dbuttonStyle: {
    marginBottom: hp(3),
  },
});
