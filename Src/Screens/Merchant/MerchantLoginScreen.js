import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../../Themes/Fonts";
import LoginTextInput from "../../Components/LoginTextInput";
import PinkButton from "../../Components/PinkButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  dispatchErrorAction,
  validateEmail,
} from "../../Services/CommonFunctions";
import { getLogin } from "../../Services/AuthApi";
import { strings } from "../../Config/I18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MerchantLoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState(__DEV__ ? "amer_bakour@hotmail.com" : "");
  const [password, setPassword] = useState(__DEV__ ? "123456" : "");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const fcmToken = useSelector((e) => e.auth.fcmToken);

  const onLogin = () => {
    if (validateEmail(email)) {
      if (password !== "") {
        AsyncStorage.getItem("Language").then((res) => {
          let data = {
            email: email,
            password: password,
            deviceType: Platform.OS == "android" ? "ANDROID" : "IOS",
            deviceToken: fcmToken,
            language: res,
          };
          dispatch(
            getLogin(data, () => {
              navigation.navigate("MerchantDrawerHome");
            })
          );
        });
      } else {
        dispatchErrorAction(
          dispatch,
          strings("validationString.please_enter_password")
        );
      }
    } else {
      dispatchErrorAction(
        dispatch,
        strings("validationString.please_enter_valid_email")
      );
    }
    // navigation.navigate("MerchantDrawerHome");
  };
  return (
    <View style={ApplicationStyles.applicationView}>
      <View style={styles.mainView}>
        <Image
          source={require("../../Images/Delivery/xxxhdpi/top_logo.png")}
          style={styles.imageLogo}
        />
        <Text style={styles.welcomeText}>{strings("login.welcome")}</Text>
        <View>
          <LoginTextInput
            name={strings("login.email")}
            placeholder={strings("login.enter_your_email_address")}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <LoginTextInput
            name={strings("login.password")}
            placeholder={strings("login.enter_your_password")}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.textinputStyle}
          />
          <PinkButton
            onPress={() =>
              // navigation.navigate("MerchantDrawerHome")
              onLogin()
            }
            style={styles.dbuttonStyle}
            name={strings("login.login_button")}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ForgotPasswordScreen", { email: email })
            }
          >
            <Text style={styles.forgot}>
              {strings("login.forgot_password")}
            </Text>
          </TouchableOpacity>

          <Text style={styles.forgot2}>
            {strings("login.Do_not_have_your_account")}{" "}
            <Text
              style={{ color: Colors.pink }}
              onPress={() => navigation.navigate("M_RegistrationScreen")}
            >
              {strings("login.signup_button")}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainView: {
    backgroundColor: Colors.backgroundScreen,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: hp(5),
  },
  imageLogo: {
    height: hp(6),
    resizeMode: "contain",
    alignSelf: "center",
  },
  welcomeText: {
    ...commonFontStyle("M_500", 20, Colors.pink),
    marginTop: hp(2.5),
    marginBottom: hp(6),
    textAlign: "center",
  },
  textinputStyle: {
    marginTop: hp(3),
  },
  dbuttonStyle: {
    marginTop: hp(9),
  },
  forgot: {
    marginTop: hp(2),
    ...commonFontStyle(500, 14, Colors.black),
    textAlign: "center",
  },
  forgot2: {
    marginTop: hp(6),
    ...commonFontStyle(400, 14, Colors.darkGrey),
    textAlign: "center",
  },
});
