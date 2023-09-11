import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../Themes/Colors";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { commonFontStyle } from "../Themes/Fonts";
import moment from "moment";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";

export default function SubscriptionToast({ data, type }) {
  const [showDes, setshowDes] = useState(false)

  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      setshowDes(false)
    }
  }, [isFocused])
  const navigation = useNavigation();
  if (showDes == false) {
    return (
      data?.subscription?.subscription_status == "invalid" ?
        <TouchableOpacity onPress={() => setshowDes(true)} style={styles.notiView}>
          <Image style={styles.notiIcon} source={require('../Images/Merchant/xxxhdpi/ic_notification.png')} />
        </TouchableOpacity> :
        data?.subscription?.subscription_status == "cancelled" ? (
          moment(data?.subscription?.expired_at) >= moment() ? null : (
            <TouchableOpacity onPress={() => setshowDes(true)} style={styles.notiView}>
              <Image style={styles.notiIcon} source={require('../Images/Merchant/xxxhdpi/ic_notification.png')} />
            </TouchableOpacity>
          )) :
          data?.subscription?.subscription_status == "active" ? null : (
            <TouchableOpacity onPress={() => setshowDes(true)} style={styles.notiView}>
              <Image style={styles.notiIcon} source={require('../Images/Merchant/xxxhdpi/ic_notification.png')} />
            </TouchableOpacity>
          )
    )
  } else return (
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
            <TouchableOpacity onPress={() => setshowDes(false)}>
              <Image source={require('../Images/Merchant/xxxhdpi/close.png')} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
        ) : data?.subscription?.subscription_status == "cancelled" ? (
          moment(data?.subscription?.expired_at) >= moment() ? null : (
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
              <TouchableOpacity onPress={() => setshowDes(false)}>
                <Image source={require('../Images/Merchant/xxxhdpi/close.png')} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          )
        ) : data?.subscription?.subscription_status == "active" ? null : (
          <View style={styles.row}>
            <View>
              <Image
                source={require("../Images/Merchant/xxxhdpi/ic_memberwhte.png")}
                style={styles.imageSub}
              />
            </View>
            <View >
              <Text style={styles.title}>{data?.subscription?.message}</Text>
              <Text style={styles.date}>
                {moment(data?.subscription?.expired_at).format("MMM DD - YYYY")}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setshowDes(false)}>
              <Image source={require('../Images/Merchant/xxxhdpi/close.png')} style={styles.closeIcon} />
            </TouchableOpacity>
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
    alignItems: "center",
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
    width: "93%",
  },
  imageSub: {
    height: heightPercentageToDP(5),
    width: heightPercentageToDP(5),
    resizeMode: "contain",
  },
  title: {
    ...commonFontStyle(700, 13, Colors.white),
    marginLeft: heightPercentageToDP(3),
    maxWidth: '85%'
  },
  date: {
    ...commonFontStyle(400, 11, Colors.white),
    marginLeft: heightPercentageToDP(3),
    marginTop: 5,
  },
  notiIcon: {
    height: heightPercentageToDP(6),
    width: heightPercentageToDP(6),
    resizeMode: "contain",
  },
  notiView: {
    position: "absolute",
    bottom: 0,
    marginBottom: 30,
    right: 30,
  },
  closeIcon: {
    height: heightPercentageToDP(2.5),
    width: heightPercentageToDP(2.5),
    resizeMode: "contain",
    tintColor: 'white'
  }
});
