import { StyleSheet, View } from "react-native";
import React from "react";
import WebView from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { dispatchAction } from "../Services/CommonFunctions";
import { getCompanyProfile } from "../Services/DeliveryApi";

export default function D_ChoosePackageScreen({ route }) {
  const id = route.params.staffId;
  console.log("route.params--", route.params);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatchAction(dispatch, "PRE_LOADER", false);
  }, []);

  const checkUrlState = (url) => {
    if (url.url.includes("company-subscription?success=1")) {
      // code to hide WebView
      console.log("here ay avyu", route?.params);
      if (route?.params?.screen == "D_CurrentPackageScreen") {
        navigation.goBack();
        dispatch(getCompanyProfile());
      }
      if (route?.params?.screen == "D_RegistrationScreen") {
        navigation.navigate("D_RegistrationScreen", { status: "done" });
      }
    }
    console.log(url);
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: "https://www.mysofra.com/subscription-plans?company=" + id,
        }}
        onNavigationStateChange={(state) => checkUrlState(state)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
