import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../../Themes/Fonts";
import LoginTextInput from "../../Components/LoginTextInput";
import PinkButton from "../../Components/PinkButton";
import {
  dispatchErrorAction,
  validateEmail,
} from "../../Services/CommonFunctions";
import { useDispatch, useSelector } from "react-redux";
import { getDeliveryLogin } from "../../Services/AuthApi";

export default function DeliveryLoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("amir.shahzadoff@gmail.com");
  const [password, setPassword] = useState("64fec4a5288b0");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const fcmToken = useSelector((e) => e.auth.fcmToken);

  const onLogin = () => {
    if (validateEmail(email)) {
      if (password !== "") {
        let data = {
          email: email,
          password: password,
          deviceType: Platform.OS == "android" ? "ANDROID" : "IOS",
          deviceToken: fcmToken,
          language: "en",
        };
        dispatch(
          getDeliveryLogin(data, () => {
            navigation.navigate("DeliveryDrawerHome");
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
        <Text style={styles.welcomeText}>Welcome Delivery</Text>
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
            onPress={() => {
              // navigation.navigate("DeliveryDrawerHome");
              onLogin();
            }}
            style={styles.dbuttonStyle}
            name={"Login"}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ForgotPasswordScreen", { email: email })
            }
          >
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>
          <Text style={styles.forgot2}>
            Don't have an accout?{" "}
            <Text
              style={{ color: Colors.pink }}
              onPress={() => navigation.navigate("D_RegistrationScreen")}
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
    // alignItems: 'center',
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
