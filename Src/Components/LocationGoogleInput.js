import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { commonFontStyle } from "../Themes/Fonts";
import Colors from "../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useState } from "react";

export default function LocationGoogleInput({
  setLocation,
  placeholder,
  value,
  screen,
  setText,
}) {
  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        fetchDetails={screen == "company" ? true : false}
        onPress={(data, details = null) => {
          let data1 = { data: data, details: details };
          screen == "company"
            ? setLocation(data1)
            : setLocation(data.description);
        }}
        onFail={(error) => {
          console.log(error);
        }}
        query={{
          key: "AIzaSyDEjeEjROHSLP3YfRln7Sk1GxUQSTGOGCI",
          language: "en",
        }}
        textInputProps={{
          placeholderTextColor: Colors.placeholderColor,
          numberOfLines: 1,
          value: value,
          onChangeText: (text) =>
            screen == "company" ? setText(text) : setLocation(text),
        }}
        styles={{
          textInput: {
            ...commonFontStyle(400, 14, Colors.black),
            backgroundColor: Colors.white,
            width: "100%",
            paddingHorizontal: hp(2),
            borderRadius: 5,
            height: hp(6),
            paddingVertical: 0,
          },
          container: {
            marginBottom: hp(2),
          },
          separator: {
            height: 0.5,
            backgroundColor: "#c8c7cc",
          },
          //   textInputContainer: {
          //     backgroundColor: "grey",
          //   },
          description: {
            ...commonFontStyle(400, 14, Colors.black),
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
