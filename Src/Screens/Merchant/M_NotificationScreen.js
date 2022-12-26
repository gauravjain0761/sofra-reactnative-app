import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import { Dropdown } from "react-native-element-dropdown";
import PinkButton from "../../Components/PinkButton";
import CheckBox from "@react-native-community/checkbox";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { getNotifications } from "../../Services/MerchantApi";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { simplifyDateTime } from "../../Services/CommonFunctions";
import { media_url } from "../../Config/AppConfig";

export default function M_NotificationScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const NOTIFICATIONS = useSelector((e) => e.merchant.notifications);
  const PRELOADER = useSelector((e) => e.merchant.preLoader);

  useEffect(() => {
    dispatch({ type: "PRE_LOADER", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getNotifications());
    });
  }, []);

  return (
    <View style={ApplicationStyles.mainViewWithoutPadding}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={ApplicationStyles.welcomeText}>Notifications</Text>
        {!PRELOADER && (
          <FlatList
            data={NOTIFICATIONS}
            ListEmptyComponent={
              <Text style={ApplicationStyles.nodataStyle}>No Data Found</Text>
            }
            renderItem={({ item, index }) => (
              <View style={styles.row}>
                <Image
                  source={
                    item?.OrderItems
                      ? { uri: media_url + item.OrderItems.image }
                      : require("../../Images/Merchant/xxxhdpi/foodDish.jpeg")
                  }
                  style={styles.image}
                />
                <View style={styles.rightView}>
                  <Text numberOfLines={2} style={styles.title}>
                    {item.msg}
                  </Text>
                  <Text style={styles.timeText}>
                    {simplifyDateTime(item.created)}
                  </Text>
                </View>
              </View>
            )}
          />
        )}
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
