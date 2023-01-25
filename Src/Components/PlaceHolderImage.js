import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { media_url } from "../Config/AppConfig";
import Colors from "../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function PlaceHolderImage({ style, image, placeHolder }) {
  return (
    <View
      style={[
        style,
        {
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.placeholde,
          marginBottom: hp(1.5),
        },
      ]}
    >
      {image ? (
        <Image
          style={[style, { width: "100%" }]}
          source={{ uri: media_url + image }}
        />
      ) : (
        <Image
          style={[
            style,
            {
              tintColor: Colors.placeholderColor,
              height: hp(13),
            },
          ]}
          source={require("../Images/Delivery/xxxhdpi/user.png")}
          resizeMode={"contain"}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
