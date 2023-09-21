import { View, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import ApplicationStyles from "../Themes/ApplicationStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import PinkButton from "../Components/PinkButton";
import Colors from "../Themes/Colors";
import { useDispatch, useSelector } from "react-redux";
import { getToken, getUser } from "../Services/asyncStorage";
import { CommonActions } from "@react-navigation/native";
import {
  getCities,
  getCuisines,
  getUsers,
  getCategories,
  getMainCategories,
} from "../Services/MerchantApi";
import messaging from "@react-native-firebase/messaging";
import { strings } from "../Config/I18n";

export default function ChooseLoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const preLoader = useSelector((e) => e.merchant.preLoader);
  useEffect(async () => {
    async function getDeviceToken() {
      messaging()
        .getToken()
        .then((fcmToken) => {
          if (fcmToken) {
            dispatch({ type: "SET_FCMTOKEN", payload: fcmToken });
          } else {
            console.log("[FCMService] User does not have a device token");
          }
        })
        .catch((error) => {
          let err = `FCm token get error${error}`;
          console.log("FCm token get error", err);
        });

      dispatch({ type: "PRE_LOADER", payload: true });
      let token = await getToken();
      let user = await getUser();
      if (token && user) {
        if (user == "delivery") {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "DeliveryDrawerHome" }],
            })
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "MerchantDrawerHome" }],
            })
          );
        }
      } else {
        dispatch({ type: "PRE_LOADER", payload: false });
      }
      dispatch(getCities());
      dispatch(getUsers());
      dispatch(getCuisines());
      dispatch(getCategories());
      dispatch(getMainCategories());
    }
    getDeviceToken();
  }, []);

  if (preLoader == false) {
    return (
      <View style={ApplicationStyles.applicationView}>
        <View style={styles.mainView}>
          <Image
            source={require("../Images/Delivery/xxxhdpi/top_logo.png")}
            style={styles.imageLogo}
          />
          <PinkButton
            onPress={() => navigation.navigate("MerchantLoginScreen")}
            style={styles.mbuttonStyle}
            name={strings('login.Merchant')}
          />
          <PinkButton
            onPress={() => navigation.navigate("DeliveryLoginScreen")}
            style={styles.dbuttonStyle}
            name={strings("login.Delivery")}
          />
        </View>
      </View>
    );
  } else {
    return <View></View>;
  }
}

const styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: hp(5),
    backgroundColor: Colors.backgroundScreen,
  },
  imageLogo: {
    height: hp(8),
    resizeMode: "contain",
  },
  mbuttonStyle: {
    marginTop: hp(10),
  },
  dbuttonStyle: {
    marginTop: hp(5),
  },
});
