import { View, Text, StyleSheet, Image, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../../Themes/Fonts";
import LoginTextInput from "../../Components/LoginTextInput";
import PinkButton from "../../Components/PinkButton";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  dispatchErrorAction,
  validateEmail,
} from "../../Services/CommonFunctions";
import messaging, { firebase } from "@react-native-firebase/messaging";
import { getLogin } from "../../Services/AuthApi";

export default function MerchantLoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState("amer_bakour@hotmail.com");
  const [password, setPassword] = useState("123456");
  const [FCMTOken, setFCMTOken] = useState("");
  useEffect(() => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          // console.log("fcmToken---", fcmToken);
          setFCMTOken(fcmToken);
        } else {
          console.log("[FCMService] User does not have a device token");
          // console.log("[FCMService] User does not have a device token")
        }
      })
      .catch((error) => {
        let err = `FCm token get error${error}`;
        console.log("FCm token get error", err);
      });
  }, []);

  const onLogin = () => {
    if (validateEmail(email)) {
      if (password !== "") {
        let data = {
          email: email,
          password: password,
          deviceType: Platform.OS == "android" ? "ANDROID" : "IOS",
          deviceToken: FCMTOken,
          language: "en",
        };
        dispatch(
          getLogin(data, () => {
            navigation.navigate("MerchantDrawerHome");
          })
        );
      } else {
        dispatchErrorAction(dispatch, "Please enter password");
      }
    } else {
      dispatchErrorAction(dispatch, "Please enter valid email");
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
        <Text style={styles.welcomeText}>Welcome Merchant</Text>
        <View>
          <LoginTextInput
            name={"Email"}
            placeholder={"Enter your email address"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <LoginTextInput
            name={"Password"}
            placeholder={"Enter your password"}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.textinputStyle}
          />
          <PinkButton
            onPress={() => onLogin()}
            style={styles.dbuttonStyle}
            name={"Login"}
          />
          <Text style={styles.forgot}>Forgot password?</Text>
          <Text style={styles.forgot2}>
            Don't have an accout?{" "}
            <Text
              style={{ color: Colors.pink }}
              onPress={() => navigation.navigate("RegistrationScreen")}
            >
              Sign Up
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
    ...commonFontStyle(400, 20, Colors.pink),
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
