import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import ApplicationStyles from "../Themes/ApplicationStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import PinkButton from "../Components/PinkButton";
import Colors from "../Themes/Colors";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../Services/asyncStorage";

export default function ChooseLoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const preLoader = useSelector((e) => e.merchant.preLoader);
  useEffect(async () => {
    dispatch({ type: "PRE_LOADER", payload: true });
    let token = await getToken();
    if (token) {
      navigation.navigate("MerchantDrawerHome");
    } else {
      dispatch({ type: "PRE_LOADER", payload: false });
    }
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
            name={"Merchant"}
          />
          <PinkButton
            onPress={() => navigation.navigate("DeliveryLoginScreen")}
            style={styles.dbuttonStyle}
            name={"Delivery"}
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
