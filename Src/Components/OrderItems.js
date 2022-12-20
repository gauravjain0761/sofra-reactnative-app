import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import Colors from "../Themes/Colors";
import { commonFontStyle, SCREEN_WIDTH } from "../Themes/Fonts";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import moment from "moment";
import ReactNativeModal from "react-native-modal";
import ApplicationStyles from "../Themes/ApplicationStyles";
import { useState } from "react";
import PinkButton from "./PinkButton";
import { useEffect } from "react";
import { orderStatusData } from "../Constant/Constant";
import { useDispatch } from "react-redux";
import { changeStatus } from "../Services/MerchantApi";

export default function OrderItems({ item, navigation, status }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [nextStatus, setnextStatus] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      status.type !== "CANCELED_USER" &&
      status.type !== "ALL" &&
      status.type !== "DELIVERED" &&
      status.type !== "REJECTED"
    ) {
      let index = orderStatusData.findIndex((obj) => obj.type == status.type);
      setnextStatus(orderStatusData[index + 1]);
    }
  }, []);
  const onStatusUpdate = () => {
    let data = { orderId: item.id, status: nextStatus.type, language: "en" };
    dispatch(changeStatus(data));
    setModalVisible(false);
  };
  return (
    <View>
      <View style={styles.mainCardView}>
        <View style={styles.leftView}>
          <Image
            style={styles.resImage}
            source={require("../Images/Merchant/xxxhdpi/foodDish.jpeg")}
          />
        </View>
        <View style={styles.RightView}>
          <View>
            <Text style={styles.name} numberOfLines={2}>
              {item.user.name}
            </Text>
            <Text style={styles.type}>
              {"Date " + moment(item.bookingDate).format("YYYY-MM-DD")}
            </Text>
            <Text style={styles.name}>AED {item.totalPrice}</Text>
            <Image
              style={styles.truckLogo}
              source={require("../Images/Merchant/xxxhdpi/ic_car.png")}
            />
          </View>
          <View>
            {status.type !== "CANCELED_USER" &&
            status.type !== "ALL" &&
            status.type !== "DELIVERED" &&
            status.type !== "REJECTED" ? (
              <TouchableOpacity
                style={{
                  borderRadius: 3,
                  overflow: "hidden",
                  alignSelf: "flex-end",
                }}
                onPress={() => setModalVisible(true)}
              >
                <Text
                  style={[styles.tagText, { backgroundColor: status?.color }]}
                >
                  {status?.title}
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  borderRadius: 3,
                  overflow: "hidden",
                  alignSelf: "flex-end",
                }}
              >
                <Text
                  style={[styles.tagText, { backgroundColor: status?.color }]}
                >
                  {status?.title}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.line}></View>

      <ReactNativeModal
        style={ApplicationStyles.modalStyle}
        isVisible={modalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View
          style={[
            ApplicationStyles.modalViewStyle,
            { paddingVertical: hp(4), paddingHorizontal: hp(2) },
          ]}
        >
          <Image
            source={require("../Images/Merchant/xxxhdpi/correct.png")}
            style={styles.icon}
          />
          <Text style={styles.title}>Are you sure?</Text>
          <Text style={styles.titleBottom}>
            You want to change the order status to{" "}
            <Text style={styles.titleBottomBold}>{nextStatus.title}</Text>. But
            it will not revert back
          </Text>
          <View style={styles.buttonRow}>
            <View style={{ width: "58%" }}>
              <PinkButton
                onPress={() => onStatusUpdate()}
                text={"small"}
                name={"Yes, do it!"}
              />
            </View>
            <View style={{ width: "38%" }}>
              <PinkButton
                onPress={() => setModalVisible(false)}
                style={{ backgroundColor: Colors.grayButtonBackground }}
                text={"small"}
                name={"Cancel"}
              />
            </View>
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
}
const styles = StyleSheet.create({
  mainCardView: {
    flexDirection: "row",
  },
  leftView: {
    paddingHorizontal: hp(2),
  },
  RightView: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: SCREEN_WIDTH - hp(26),
  },
  resImage: {
    width: hp(20),
    height: hp(16),
    resizeMode: "cover",
    borderRadius: 10,
  },
  line: {
    height: 1,
    backgroundColor: Colors.placeholderColor,
    marginVertical: hp(2),
  },
  truckLogo: {
    width: hp(4),
    height: hp(4),
    resizeMode: "contain",
    marginVertical: 5,
  },
  tagText: {
    paddingVertical: 8,
    paddingHorizontal: 13,
    ...commonFontStyle("M_600", 12, Colors.white),
  },
  name: {
    ...commonFontStyle(600, 14, Colors.black),
  },
  type: {
    ...commonFontStyle(500, 12, Colors.tabIconColor),
    paddingVertical: 5,
  },

  icon: {
    height: hp(10),
    width: hp(10),
    resizeMode: "contain",
    alignSelf: "center",
    tintColor: Colors.green,
  },
  title: {
    textAlign: "center",
    ...commonFontStyle("M_600", 20, Colors.black),
    paddingVertical: hp(2),
  },
  titleBottom: {
    textAlign: "center",
    ...commonFontStyle("M_400", 16, Colors.black),
    paddingBottom: hp(2),
  },
  titleBottomBold: {
    ...commonFontStyle("M_600", 16, Colors.black),
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    // flex: 1,
    justifyContent: "space-between",
  },
});
