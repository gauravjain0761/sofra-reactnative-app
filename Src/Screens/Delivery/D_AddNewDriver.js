import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { useDispatch } from "react-redux";

export default function D_AddNewDriver({ navigation }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  useEffect(() => {
    // dispatch({ type: "PRE_LOADER_DELIVERY", payload: false });
  }, []);

  return (
    <View style={ApplicationStyles.mainView}>
      <Image
        source={require("../../Images/Delivery/xxxhdpi/top_logo.png")}
        style={styles.imageLogo}
      />
      <Text style={styles.titleTextStyle}>Become a delivery partner</Text>

      <ScrollView
        contentContainerStyle={styles.scrollviewStyle}
        showsVerticalScrollIndicator={false}
      >
        <TextInput style={styles.textInputStyle} placeholder="Business Name*" />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Business Address*"
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Trade Licence Number"
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Website, Instagram, Facebook account"
        />
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.dualInputInLineStyle}
            placeholder="First name*"
          />
          <TextInput
            style={styles.dualInputInLineStyle}
            placeholder="Last name*"
          />
        </View>
        <TextInput style={styles.textInputStyle} placeholder="Business type*" />
        <TextInput style={styles.textInputStyle} placeholder="Email*" />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Mobile number (+971...)*"
        />

        <View style={styles.submitBtnView}>
          <Text style={styles.submitTxtStyle}>Submit</Text>
        </View>

        <Text style={styles.termsText1}>
          By clicking 'Submit', I hereby acknowledge and agree that I have reed
          and understood sofra
          <Text style={styles.termsText2}>Terms & Conditions</Text>
        </Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  imageLogo: {
    height: hp(5),
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: 20,
  },
  titleTextStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
    paddingVertical: 20,
  },
  scrollviewStyle: { paddingBottom: 30 },
  textInputStyle: {
    fontSize: 13,
    backgroundColor: Colors.white,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginVertical: 8,
  },
  dualInputInLineStyle: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginVertical: 8,
    marginHorizontal: 4,
  },
  submitBtnView: {
    alignItems: "center",
    paddingVertical: 11,
    marginVertical: 20,
    backgroundColor: Colors.pink,
    borderRadius: 4,
  },
  submitTxtStyle: { fontSize: 16, color: Colors.white },
  termsText1: {
    fontSize: 11,
    color: Colors.black,
  },
  termsText2: {
    fontSize: 14,
    color: Colors.pink,
    fontWeight: "bold",
  },
});
