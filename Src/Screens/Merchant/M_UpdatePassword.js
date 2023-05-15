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
import { strings } from "../../Config/I18n";
import { getLanguage } from "../../Services/asyncStorage";
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
  const onUpdatePassword = async () => {
    let lan = await getLanguage();
    let data = {
      old_password: oldPwd,
      new_password: newPwd,
      confirm_password: confirmPwd,
      language: lan,
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
              strings(
                "validationString.lateralEntry.confirm_pass_match_new_and_pass"
              )
            );
          }
        } else {
          dispatchErrorAction(
            dispatch,
            strings("validationString.please_enter_new_password_again")
          );
        }
      } else {
        dispatchErrorAction(
          dispatch,
          strings("validationString.please_enter_new_password")
        );
      }
    } else {
      dispatchErrorAction(
        dispatch,
        strings("validationString.please_enter_old_password")
      );
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
          <Text style={styles.title}>
            {strings("updatePassword.update_password_here")}
          </Text>
          <View>
            <RegistrationTextInput
              placeholder={`${strings("updatePassword.old_pass")}*`}
              value={oldPwd}
              onChangeText={(text) => setoldPwd(text)}
            />
            <Text style={styles.bottomText}>
              {strings("updatePassword.please_enter_old_pass_here")}
            </Text>

            <RegistrationTextInput
              placeholder={`${strings("updatePassword.new_pass")}*`}
              value={newPwd}
              onChangeText={(text) => setnewPwd(text)}
            />
            <Text style={styles.bottomText}>
              {strings("updatePassword.please_enter_new_pass_here")}
            </Text>
            <RegistrationTextInput
              placeholder={`${strings("updatePassword.confirm_pass")}*`}
              value={confirmPwd}
              onChangeText={(text) => setconfirmPwd(text)}
            />
            <Text style={styles.bottomText}>
              {strings("updatePassword.please_enter_new_password_again_here")}
            </Text>
          </View>
        </View>
        <View style={styles.button}>
          <PinkButton
            onPress={() => validation()}
            style={styles.dbuttonStyle}
            text={"small"}
            name={strings("updatePassword.update_password")}
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
    textAlign: "left",
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
    textAlign: "left",
  },
  bottomText: {
    ...commonFontStyle(400, 12, Colors.darkGrey),
    marginTop: -hp(1),
    marginBottom: hp(3),
    textAlign: "left",
  },
  button: {
    width: "60%",
    alignSelf: "center",
  },
});
