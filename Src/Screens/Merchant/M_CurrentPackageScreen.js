import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { strings } from "../../Config/I18n";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import PinkButton from "../../Components/PinkButton";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  cancelSubscription,
  getMySubscription,
} from "../../Services/MerchantApi";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import moment from "moment";
import CancelSubscriptionPopup from "../../Components/CancelSubscriptionPopup";

export default function M_CurrentPackageScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const merchantSubscription = useSelector(
    (e) => e.merchant.merchantSubscription
  );
  const RESTAURANT = useSelector((e) => e.merchant.restaurant);
  const isFocused = useIsFocused();
  const [canpopup, setcanpopup] = useState(false);
  useEffect(() => {
    if (isFocused == true) {
      dispatch(getMySubscription());
    }
  }, [isFocused]);

  const onCancel = () => {
    setcanpopup(true);
    // dispatch(cancelSubscription());
  };

  const onSubscribe = () => {
    navigation.navigate("ChoosePackageScreen", {
      staffId: RESTAURANT.staffId,
      screen: "M_CurrentPackageScreen",
    });
  };

  console.log(moment(merchantSubscription.expired_at) >= moment());

  return (
    Object.keys(merchantSubscription).length !== 0 && (
      <View style={ApplicationStyles.mainView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {RESTAURANT &&
            RESTAURANT?.subscription?.subscription_status == "invalid" ? (
            <View>
              <Text style={[styles.heading, { marginTop: hp(3) }]}>
                {RESTAURANT?.subscription.message}
              </Text>
              <PinkButton
                onPress={() => onSubscribe()}
                style={styles.pinkBtn}
                name={strings("current_package.subscribe")}
              />
            </View>
          ) : Object.keys(merchantSubscription).length !== 0 &&
            merchantSubscription?.subscription &&
            merchantSubscription.subscription.title &&
            RESTAURANT &&
            RESTAURANT?.subscription?.subscription_status == "active" ? (
            <View>
              <Text style={ApplicationStyles.welcomeText}>
                {strings("current_package.my_subscription")}
              </Text>
              <Text style={styles.heading}>
                {strings("current_package.your_current_package")}
              </Text>
              <Image
                source={
                  merchantSubscription.subscription.title == "Basic"
                    ? require("../../Images/Merchant/xxxhdpi/badsic.png")
                    : merchantSubscription.subscription.title == "Premium"
                      ? require("../../Images/Merchant/xxxhdpi/pro.png")
                      : require("../../Images/Merchant/xxxhdpi/standerd.png")
                }
                style={styles.imageCard}
              />
              <Text style={styles.heading}>
                {strings("current_package.package_expire")}{" "}
                {moment(merchantSubscription.expired_at).format("DD MMMM YYYY")}
              </Text>
              {RESTAURANT &&
                RESTAURANT?.subscription?.subscription_status == "expire" && (
                  <PinkButton
                    onPress={() => onSubscribe()}
                    style={styles.pinkBtn}
                    name={strings("current_package.renew_btn")}
                  />
                )}
              <TouchableOpacity
                onPress={() => onCancel()}
                style={styles.cancelbtn}
              >
                <Text style={styles.btnText}>
                  {strings("current_package.cancel_btn")}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {moment(merchantSubscription.expired_at) >= moment() ? (
                <View>
                  <Text style={ApplicationStyles.welcomeText}>
                    {strings("current_package.my_subscription")}
                  </Text>
                  <Text style={styles.heading}>
                    {strings("current_package.your_current_package")}
                  </Text>
                  <Image
                    source={
                      merchantSubscription.subscription.title == "Basic"
                        ? require("../../Images/Merchant/xxxhdpi/badsic.png")
                        : merchantSubscription.subscription.title == "Premium"
                          ? require("../../Images/Merchant/xxxhdpi/pro.png")
                          : require("../../Images/Merchant/xxxhdpi/standerd.png")
                    }
                    style={styles.imageCard}
                  />
                  <Text style={styles.heading}>
                    {strings("current_package.package_expire")}{" "}
                    {moment(merchantSubscription.expired_at).format(
                      "DD MMMM YYYY"
                    )}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={[styles.heading, { marginTop: hp(3) }]}>
                    {RESTAURANT?.subscription.message}
                  </Text>
                  <PinkButton
                    onPress={() => onSubscribe()}
                    style={styles.pinkBtn}
                    name={strings("current_package.subscribe")}
                  />
                </View>
              )}
            </View>
          )}
        </ScrollView>
        <CancelSubscriptionPopup
          isVisible={canpopup}
          onClose={() => setcanpopup(false)}
          onCancel={() => {
            dispatch(cancelSubscription()), setcanpopup(false);
          }}
        />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  heading: {
    ...commonFontStyle("400", 16, Colors.black),
  },
  cancelbtn: {
    marginTop: 10,
    paddingVertical: hp(1),
  },
  btnText: {
    textAlign: "center",
    ...commonFontStyle("400", 15, Colors.black),
  },
  pinkBtn: {
    marginTop: hp(12),
  },
  imageCard: {
    resizeMode: "cover",
    width: Dimensions.get("window").width - hp(4),
    height: null,
    overflow: "hidden",
    borderRadius: 10,
    aspectRatio: 3 / 1.65,
    marginVertical: hp(3),
  },
});
