import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ReactNativeModal from "react-native-modal";
import ApplicationStyles from "../Themes/ApplicationStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../Themes/Fonts";
import Colors from "../Themes/Colors";
import PinkButton from "./PinkButton";
import { strings } from "../Config/I18n";
import { useSelector } from "react-redux";

export default function DeleteModal({ onDelete, onClose, isVisible }) {
  const isDeleteAccount = useSelector((e) => e.merchant.isDeleteAccount);
  return (
    <ReactNativeModal
      style={ApplicationStyles.modalStyle}
      isVisible={isVisible}
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
          source={require("../Images/Merchant/xxxhdpi/danger.png")}
          style={styles.icon}
        />
        {isDeleteAccount == true ? (
          <View>
            <Text style={styles.title}>
              {strings("pop_up.Are_you_sure_delete_account")}
            </Text>
            {/* <Text style={styles.titleBottom}>
              {strings("pop_up.popup_text1")}
            </Text> */}
          </View>
        ) : (
          <View>
            <Text style={styles.title}>{strings("pop_up.Are_you_sure")}</Text>
            <Text style={styles.titleBottom}>
              {strings("pop_up.popup_text1")}
            </Text>
          </View>
        )}

        <View style={styles.buttonRow}>
          <View style={{ width: "58%" }}>
            <PinkButton
              onPress={() => onDelete()}
              text={"small"}
              name={strings("pop_up.delete_it")}
            />
          </View>
          <View style={{ width: "38%" }}>
            <PinkButton
              onPress={() => onClose()}
              style={{ backgroundColor: Colors.grayButtonBackground }}
              text={"small"}
              name={strings("pop_up.cancel")}
            />
          </View>
        </View>
      </View>
    </ReactNativeModal>
  );
}
const styles = StyleSheet.create({
  icon: {
    height: hp(10),
    width: hp(10),
    resizeMode: "contain",
    alignSelf: "center",
    tintColor: Colors.red,
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
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
});
