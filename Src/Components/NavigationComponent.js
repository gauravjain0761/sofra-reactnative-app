import React from "react";
import { Image, TouchableOpacity } from "react-native";
import ApplicationStyles from "../Themes/ApplicationStyles";

export default function HeaderLeftIcon({ navigation, navigationPress }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigationPress && navigationPress == "back"
          ? navigation.goBack()
          : navigation.openDrawer();
      }}
      style={ApplicationStyles.headerRightView}
    >
      <Image
        source={require("../Images/Delivery/xxxhdpi/ic_menu.png")}
        style={{ height: 18, width: 18, resizeMode: "contain" }}
      />
    </TouchableOpacity>
  );
}
