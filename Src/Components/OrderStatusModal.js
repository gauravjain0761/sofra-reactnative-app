import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Colors from "../Themes/Colors";
import { commonFontStyle, SCREEN_WIDTH } from "../Themes/Fonts";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ReactNativeModal from "react-native-modal";
import ApplicationStyles from "../Themes/ApplicationStyles";
import PinkButton from "./PinkButton";

export default function OrderStatusModal({
  modalVisible,
  onClose,
  nextStatus,
  onStatusUpdate,
}) {
  return (
    <ReactNativeModal
      style={ApplicationStyles.modalStyle}
      isVisible={modalVisible}
      onBackButtonPress={() => onClose()}
      onBackdropPress={() => onClose()}
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
          <Text style={styles.titleBottomBold}>{nextStatus.title}</Text>. But it
          will not revert back
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
              onPress={() => onClose()}
              style={{ backgroundColor: Colors.grayButtonBackground }}
              text={"small"}
              name={"Cancel"}
            />
          </View>
        </View>
      </View>
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  mainCardView: {
    flexDirection: "row",
    // paddingHorizontal: 0,
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
    lineHeight: 14,
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
    alignSelf: "center",
    justifyContent: "space-between",
  },
  buttonRow2: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    // flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
});
