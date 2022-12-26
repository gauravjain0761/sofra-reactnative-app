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
import { useDispatch } from "react-redux";
import { dispatchErrorAction } from "../../Services/CommonFunctions";
import { updatePassword } from "../../Services/AuthApi";
import { useNavigation } from "@react-navigation/native";
import { merchant_url } from "../../Config/AppConfig";

export default function M_UpdatePassword() {
  const dispatch = useDispatch();
  const [oldPwd, setoldPwd] = useState("");
  const [newPwd, setnewPwd] = useState("");
  const [confirmPwd, setconfirmPwd] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("focus", () => {
      setoldPwd("");
      setnewPwd("");
      setconfirmPwd("");
    });
  }, []);
  const onUpdatePassword = () => {
    let data = {
      old_password: oldPwd,
      new_password: newPwd,
      confirm_password: confirmPwd,
    };
    let url = merchant_url;
    dispatch(
      updatePassword(data, url, () => {
        setoldPwd("");
        setnewPwd("");
        setconfirmPwd("");
        navigation.goBack();
      })
    );
  };
  const validation = () => {
    if (oldPwd.trim() !== "") {
      if (newPwd.trim() !== "") {
        if (confirmPwd.trim() !== "") {
          if (newPwd == confirmPwd) {
            onUpdatePassword();
          } else {
            dispatchErrorAction(
              dispatch,
              "Confirm password doesn't match with new password"
            );
          }
        } else {
          dispatchErrorAction(dispatch, "Please enter new password again");
        }
      } else {
        dispatchErrorAction(dispatch, "Please enter new password");
      }
    } else {
      dispatchErrorAction(dispatch, "Please enter old password");
    }
  };

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
            onPress={() => validation()}
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
