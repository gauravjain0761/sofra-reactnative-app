import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React, { useState } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import PinkButton from "../../Components/PinkButton";
import {
  dispatchErrorAction,
  getFromDataJson,
} from "../../Services/CommonFunctions";
import { useDispatch, useSelector } from "react-redux";
import { AddOffer } from "../../Services/MerchantApi";

const citydata = [
  {
    id: 1,
    strategicName: "SUPERTREND",
  },
  { id: 2, strategicName: "VWAP" },
  { id: 3, strategicName: "RSIMA" },
  { id: 6, strategicName: "TESTING" },
  { id: 10, strategicName: "DEMATADE" },
];
export default function M_CreateOfferScreen() {
  const dispatch = useDispatch();
  const [Detail, setDetail] = useState("");
  const [Users, setUsers] = useState([]);
  const USERS = useSelector((e) => e.merchant.users);
  const onCreateOffer = () => {
    if (Detail.trim() !== "") {
      if (Users.length !== 0) {
        let userIdJson = getFromDataJson(USERS, Users, "userIds");
        console.log("userIdJson", userIdJson);
        let data = { title: Detail, type: "", ...userIdJson };
        dispatch(AddOffer(data));
      } else {
        dispatchErrorAction(dispatch, "Please select users");
      }
    } else {
      dispatchErrorAction(dispatch, "Please enter offer detail");
    }
  };
  return (
    <View style={ApplicationStyles.mainView}>
      <Text style={ApplicationStyles.welcomeText}>Create Offer</Text>
      <Text style={styles.inputName}>Offer Detail*</Text>
      <TextInput
        value={Detail}
        onChangeText={(text) => setDetail(text)}
        multiline={true}
        style={styles.textInput}
        placeholder={"Enter Detail"}
        placeholderTextColor={Colors.darkGrey}
        textAlignVertical={"top"}
      />
      <Text style={styles.bottomText}>Please enter the offer detail here.</Text>
      <Text style={[styles.inputName, { marginTop: hp(3) }]}>Users*</Text>
      <MultiSelect
        style={[styles.tradetypeviewStyle]}
        placeholderStyle={
          Users.length !== 0
            ? styles.placeholderSelectedStyle
            : styles.placeholderStyle
        }
        data={USERS}
        selectedTextStyle={[styles.TitleTextStyle]}
        iconColor={Colors.black}
        labelField={"name"}
        valueField={"name"}
        maxHeight={300}
        placeholder={Users.length !== 0 ? Users.toString() : "Nothing Selected"}
        value={Users}
        onChange={(item) => {
          setUsers(item);
        }}
        renderItem={(item, selected) => {
          return (
            <View style={styles.selectedItemsDropdown}>
              <Text style={styles.textItem}>{item["name"]}</Text>
              {selected && (
                <Image
                  source={require("../../Images/Merchant/xxxhdpi/tick.png")}
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
      <Text style={styles.bottomText}>Please select users here.</Text>
      <PinkButton
        onPress={() => onCreateOffer()}
        style={styles.dbuttonStyle}
        text={"small"}
        name={"Create Offer"}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  inputName: {
    ...commonFontStyle(500, 16, Colors.pink),
    // marginTop: hp(4),
  },
  textInput: {
    ...commonFontStyle(400, 14, Colors.black),
    backgroundColor: Colors.white,
    marginBottom: hp(2),
    width: "100%",
    // height: hp(6),
    height: hp(23),
    padding: hp(2),
    borderRadius: 5,
    marginVertical: hp(2),
  },
  bottomText: {
    ...commonFontStyle(400, 14, Colors.darkGrey),
    marginTop: -hp(1),
  },
  placeholderStyle: {
    ...commonFontStyle(400, 14, Colors.darkGrey),
  },
  placeholderSelectedStyle: {
    ...commonFontStyle(400, 14, Colors.black),
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
    marginTop: hp(2),
  },
  textItem: {
    ...commonFontStyle(400, 14, Colors.black),
  },
  dbuttonStyle: {
    marginTop: hp(8),
  },
  buttonTextStyle: {
    ...commonFontStyle(400, 16, Colors.white),
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
