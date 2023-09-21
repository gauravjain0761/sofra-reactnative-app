import { I18nManager, StyleSheet, Text, View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from "react-native-responsive-screen";

export default function TermsScreen() {
    return (
        <View
            style={{
                flex: 1,
                height: heightPercentageToDP(100),
                width: widthPercentageToDP(100),
            }}
        >
            <WebView
                style={{
                    flex: 1,
                    height: heightPercentageToDP(100),
                    width: widthPercentageToDP(100),
                }}
                source={{ uri: I18nManager.isRTL ? "https://mysofra.com/terms-and-conditions-merchant-ar" : "https://mysofra.com/terms-and-conditions-merchant" }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})