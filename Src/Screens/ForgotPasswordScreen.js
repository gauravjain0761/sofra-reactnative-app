import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import ApplicationStyles from "../Themes/ApplicationStyles";
import Colors from "../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../Themes/Fonts";
import LoginTextInput from "../Components/LoginTextInput";
import PinkButton from "../Components/PinkButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  dispatchErrorAction,
  validateEmail,
} from "../Services/CommonFunctions";
import { forgotPassword, getLogin } from "../Services/AuthApi";

export default function ForgotPasswordScreen({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState(route.params.email);
  const fcmToken = useSelector((e) => e.auth.fcmToken);

  const onSendMail = () => {
    if (validateEmail(email)) {
      let data = { email: email };
      dispatch(
        forgotPassword(data, () => {
          navigation.goBack();
        })
      );
    } else {
      dispatchErrorAction(dispatch, "Please enter valid email");
    }
    // navigation.navigate("MerchantDrawerHome");
  };
  return (
    <View style={ApplicationStyles.mainView}>
      <Text style={ApplicationStyles.welcomeText}>Forgot Password</Text>
      <View style={styles.mainView}>
        <View>
          <Text style={styles.forgot22}>
            Enter your email to receive an email to reset your password
          </Text>
          <LoginTextInput
            name={"Email"}
            placeholder={"Enter your email address"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <PinkButton
            onPress={() => onSendMail()}
            style={styles.dbuttonStyle}
            name={"Submit"}
          />

          <Text style={styles.forgot2}>
            Already have an account?{" "}
            <Text
              style={{ color: Colors.pink }}
              onPress={() => navigation.goBack()}
            >
              Sign In
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
    // justifyContent: "center",
    marginTop: hp(3),
    paddingHorizontal: hp(2),
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
    marginTop: hp(3),
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
  forgot22: {
    marginBottom: hp(3),
    ...commonFontStyle(400, 14, Colors.darkGrey),
  },
});
