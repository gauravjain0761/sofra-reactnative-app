import { View, Image, StyleSheet, Text } from "react-native";
import React from "react";
import ReactNativeModal from "react-native-modal";
import ApplicationStyles from "../Themes/ApplicationStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../Themes/Fonts";
import Colors from "../Themes/Colors";
import PinkButton from "./PinkButton";
import { strings } from "../Config/I18n";

export default function UpgradeModal({ onClose,
    isVisible,
    onUpgrade, }) {
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
                <View>
                    <Text style={styles.title}>
                        {strings("pop_up.upgradeText")}
                    </Text>
                </View>
                <View style={styles.buttonRow}>
                    <View style={{ width: "58%" }}>
                        <PinkButton
                            onPress={() => onUpgrade()}
                            text={"small"}
                            name={strings("pop_up.agree")}
                        />
                    </View>
                    <View style={{ width: "38%" }}>
                        <PinkButton
                            onPress={() => onClose()}
                            style={{ backgroundColor: Colors.grayButtonBackground }}
                            text={"small"}
                            name={strings("pop_up.cancel2")}
                        />
                    </View>
                </View>
            </View>
        </ReactNativeModal>
    )
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
        ...commonFontStyle("M_600", 16, Colors.black),
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