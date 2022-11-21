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
export default function M_AppSetting() {
  const [switchEmable, setswitchEmable] = useState(true);
  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>Update App Settings</Text>
        <Text style={styles.title}>Update Availabilites Here</Text>
        <View style={styles.row}>
          <Text style={[styles.title2, { marginBottom: 0 }]}>
            Taking Orders
          </Text>
          <Switch
            ios_backgroundColor={"#cccccc"}
            trackColor={{
              false: Colors.placeholderColor,
              true: Colors.pink,
            }}
            thumbColor={switchEmable ? Colors.white : Colors.darkGrey}
            style={{
              transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
              marginTop: 0,
            }}
            onValueChange={() => setswitchEmable(!switchEmable)}
            value={switchEmable}
          />
        </View>
        <PinkButton
          onPress={() => {}}
          style={styles.dbuttonStyle}
          text={"small"}
          name={"Update Settings"}
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
  dbuttonStyle: {
    marginTop: hp(15),
  },
  title: {
    ...commonFontStyle(600, 18, Colors.black),
    marginBottom: hp(3),
    marginTop: hp(4),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
  title2: {
    ...commonFontStyle(400, 17, Colors.darkGrey),
  },
});
