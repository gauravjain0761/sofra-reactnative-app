import { StyleSheet, View } from "react-native";
import React from "react";
import WebView from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getRestaurnatDetails } from "../Services/MerchantApi";
import { useEffect } from "react";
import { dispatchAction } from "../Services/CommonFunctions";

export default function ChoosePackageScreen({ route }) {
  const id = route.params.staffId;
  console.log("route.params--", route.params);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatchAction(dispatch, "PRE_LOADER", false);
  }, []);

  const checkUrlState = (url) => {
    if (url.url.includes("my-subscription?success=1")) {
      // code to hide WebView
      console.log("here ay avyu", route?.params);
      if (route?.params?.screen == "M_CurrentPackageScreen") {
        navigation.goBack();
        dispatch(getRestaurnatDetails());
      }
      if (route?.params?.screen == "M_RegistrationScreen") {
        navigation.navigate("M_RegistrationScreen", { status: "done" });
      }
    }
    console.log(url);
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: "https://www.mysofra.com/subscription-plans?merchant=" + id,
        }}
        onNavigationStateChange={(state) => checkUrlState(state)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
