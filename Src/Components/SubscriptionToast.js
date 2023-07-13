import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../Themes/Colors";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { commonFontStyle } from "../Themes/Fonts";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

export default function SubscriptionToast({ data, type }) {
  const navigation = useNavigation();
  return (
    <View style={styles.absoluteView}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            type == "merchant"
              ? "M_CurrentPackageScreen"
              : "D_CurrentPackageScreen"
          )
        }
      >
        {data?.subscription?.subscription_status == "invalid" ? (
          <View style={styles.row}>
            <View>
              <Image
                source={require("../Images/Merchant/xxxhdpi/ic_memberwhte.png")}
                style={styles.imageSub}
              />
            </View>
            <View>
              <Text style={styles.title}>{data?.subscription?.message}</Text>
            </View>
          </View>
        ) : data?.subscription?.subscription_status == "cancelled" ? (
          <View style={styles.row}>
            <View>
              <Image
                source={require("../Images/Merchant/xxxhdpi/ic_memberwhte.png")}
                style={styles.imageSub}
              />
            </View>
            <View>
              <Text style={styles.title}>{data?.subscription?.message}</Text>
            </View>
          </View>
        ) : data?.subscription?.subscription_status == "active" ? null : (
          <View style={styles.row}>
            <View>
              <Image
                source={require("../Images/Merchant/xxxhdpi/ic_memberwhte.png")}
                style={styles.imageSub}
              />
            </View>
            <View>
              <Text style={styles.title}>{data?.subscription?.message}</Text>
              <Text style={styles.date}>
                {moment(data?.subscription?.expired_at).format("MMM DD - YYYY")}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteView: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.pink,
    justifyContent: "center",
    paddingVertical: heightPercentageToDP(1),
    paddingHorizontal: heightPercentageToDP(3),
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 15,
  },
  imageSub: {
    height: heightPercentageToDP(5),
    width: heightPercentageToDP(5),
    resizeMode: "contain",
  },
  title: {
    ...commonFontStyle(700, 13, Colors.white),
    marginLeft: heightPercentageToDP(3),
  },
  date: {
    ...commonFontStyle(400, 11, Colors.white),
    marginLeft: heightPercentageToDP(3),
    marginTop: 5,
  },
});
