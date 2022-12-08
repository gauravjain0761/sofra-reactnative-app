import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function D_NotificationScreen() {
  return (
    <View style={ApplicationStyles.mainViewWithoutPadding}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={ApplicationStyles.welcomeText}>Notifications</Text>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
          return (
            <View style={styles.row}>
              <Image
                source={require("../../Images/Merchant/xxxhdpi/foodDish.jpeg")}
                style={styles.image}
              />
              <View style={styles.rightView}>
                <Text style={styles.title}>
                  Brownie cookies for tea party ready within 2 days
                </Text>
                <Text style={styles.timeText}>2h ago</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: Colors.placeholderColor,
    paddingHorizontal: hp(2),
  },
  image: {
    height: hp(8),
    width: hp(8),
    resizeMode: "cover",
    borderRadius: 3,
  },
  rightView: {
    flex: 1,
    paddingLeft: hp(1.5),
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    ...commonFontStyle(400, 14, Colors.darkGrey),
    lineHeight: 18,
  },
  timeText: { ...commonFontStyle(500, 14, Colors.black) },
});
