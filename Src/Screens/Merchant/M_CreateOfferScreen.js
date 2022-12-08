import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import { Dropdown } from "react-native-element-dropdown";
import PinkButton from "../../Components/PinkButton";
import { dispatchErrorAction } from "../../Services/CommonFunctions";
import { useDispatch } from "react-redux";

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
  const [Users, setUsers] = useState("");

  const onCreateOffer = () => {
    if (Detail.trim() !== "") {
      if (Users.trim() !== "") {
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
      <Dropdown
        // selectedStyle={{color:colors.gray3}}
        style={[styles.tradetypeviewStyle]}
        placeholderStyle={styles.placeholderStyle}
        data={citydata}
        selectedTextStyle={[styles.TitleTextStyle]}
        iconColor={Colors.black}
        // activeColor={colors.Gray300}
        // disable ={runningTradeTypePositions[item.tradeType] && true}
        labelField={"strategicName"}
        valueField={"strategicName"}
        maxHeight={300}
        placeholder={"Nothing Selected"}
        value={Users}
        onChange={(item) => {
          setUsers(item["strategicName"]);
        }}
        renderItem={(item) => {
          return (
            <View>
              <Text style={styles.textItem}>{item["strategicName"]}</Text>
            </View>
          );
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
    paddingVertical: hp(1),
    paddingHorizontal: hp(3),
  },
  dbuttonStyle: {
    marginTop: hp(8),
  },
  buttonTextStyle: {
    ...commonFontStyle(400, 16, Colors.white),
  },
});
