import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import ApplicationStyles from "../Themes/ApplicationStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { commonFontStyle } from "../Themes/Fonts";
import Colors from "../Themes/Colors";
import RegistrationTextInput from "../Components/RegistrationTextInput";
import PinkButton from "../Components/PinkButton";
import { useSelector } from "react-redux";

let data = [
  {
    title: "Menu Categorysr#",
    value: "#25465",
  },
  {
    title: "Menu Categoryid",
    value: "Organic Oils",
  },
  {
    title: "Order date",
    value: "2022-10-13",
  },
  {
    title: "time",
    value: "09:00",
  },
  {
    title: "mode of payment",
    value: "By Card",
  },
  {
    title: "amount",
    value: "AED 105.00",
  },
  {
    title: "menu category sub total",
    value: "AED 205.00",
  },
  {
    title: "Discount",
    value: "10%",
  },
  {
    title: "net amount",
    value: "AED 90.00",
  },
  {
    title: "vat",
    value: "5%",
  },
  {
    title: "Gross amount",
    value: "AED 50.00",
  },
  {
    title: "sofra comissionable amount",
    value: "AED 20.00",
  },
  {
    title: "sofra comission",
    value: "20%",
  },
];
export default function ReportSettled() {
  // const REPORT = useSelector((e) =>
  //   e.state.setteled_report == {}
  //     ? e.state.unsetteled_report
  //     : e.state.setteled_report
  // );

  // console.log("REPORT", REPORT);
  return (
    <View>
      <PinkButton name={"Export to CSV"} onPress={() => {}} text={"small"} />

      <View>
        <Text style={styles.tabTitle}>Reports - Setteled</Text>
        <View style={styles.itemList}>
          {data.map((element, index) => {
            return (
              <View style={styles.row}>
                <Text style={styles.leftText}>
                  {element.title.toUpperCase()}
                </Text>
                <Text style={styles.rightText}>{element.value}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemList: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: hp(1.5),
  },
  row: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: hp(2),
    paddingHorizontal: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundScreen,
  },

  leftText: {
    ...commonFontStyle(400, 13, Colors.black),
  },
  rightText: {
    ...commonFontStyle(400, 13, Colors.grayButtonBackground),
  },
  tabTitle: {
    ...commonFontStyle(500, 16, Colors.black),
    marginVertical: hp(2.5),
  },
});
