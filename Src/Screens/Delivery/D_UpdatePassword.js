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
import React, { useState, useEffect } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import { Dropdown } from "react-native-element-dropdown";
import PinkButton from "../../Components/PinkButton";
import CheckBox from "@react-native-community/checkbox";
import RegistrationTextInput from "../../Components/RegistrationTextInput";

export default function D_UpdatePassword({ navigation }) {
  const [oldPwd, setoldPwd] = useState("");
  const [newPwd, setnewPwd] = useState("");
  const [confirmPwd, setconfirmPwd] = useState("");
  useEffect(() => {
    navigation.addListener("focus", () => {
      setoldPwd("");
      setnewPwd("");
      setconfirmPwd("");
      // calendarRef.current.se;
    });
  }, []);
  return (
    <View style={ApplicationStyles.mainView}>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          paddingBottom: hp(3),
        }}
      >
        <View>
          <Text style={styles.title}>Update Password Here:</Text>
          <View>
            <RegistrationTextInput
              placeholder={"Old Password*"}
              value={oldPwd}
              onChangeText={(text) => setoldPwd(text)}
            />
            <Text style={styles.bottomText}>
              Please enter the old password here.
            </Text>

            <RegistrationTextInput
              placeholder={"New Password*"}
              value={newPwd}
              onChangeText={(text) => setnewPwd(text)}
            />
            <Text style={styles.bottomText}>
              Please enter the new password here.
            </Text>
            <RegistrationTextInput
              placeholder={"Confirm Password*"}
              value={confirmPwd}
              onChangeText={(text) => setconfirmPwd(text)}
            />
            <Text style={styles.bottomText}>
              Please enter the new password again here.
            </Text>
          </View>
        </View>
        <View style={styles.button}>
          <PinkButton
            onPress={() => {}}
            style={styles.dbuttonStyle}
            text={"small"}
            name={"Update Password"}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
  bottomText: {
    ...commonFontStyle(400, 12, Colors.darkGrey),
    marginTop: -hp(1),
    marginBottom: hp(3),
  },
  button: {
    width: "60%",
    alignSelf: "center",
  },
});
