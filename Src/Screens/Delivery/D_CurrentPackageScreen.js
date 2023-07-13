import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { strings } from "../../Config/I18n";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import PinkButton from "../../Components/PinkButton";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import moment from "moment";
import {
  cancelSubscriptionCompany,
  getMySubscriptionCompany,
} from "../../Services/DeliveryApi";

export default function D_CurrentPackageScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const companySubscription = useSelector(
    (e) => e.delivery.companySubscription
  );
  const COMPANY = useSelector((e) => e.delivery.companyProfile);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused == true) dispatch(getMySubscriptionCompany());
  }, [isFocused]);

  const onCancel = () => {
    dispatch(cancelSubscriptionCompany());
  };

  const onSubscribe = () => {
    navigation.navigate("D_ChoosePackageScreen", {
      staffId: COMPANY.id,
      screen: "D_CurrentPackageScreen",
    });
  };

  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.keys(companySubscription).length !== 0 ? (
          companySubscription == "You have not purcashed any subscription" ? (
            <View>
              <Text style={[styles.heading, { marginTop: hp(3) }]}>
                {companySubscription}
              </Text>
              <PinkButton
                onPress={() => onSubscribe()}
                style={styles.pinkBtn}
                name={strings("current_package.subscribe")}
              />
            </View>
          ) : COMPANY &&
            COMPANY?.subscription?.subscription_status !== "cancelled" ? (
            <View>
              <Text style={ApplicationStyles.welcomeText}>
                {strings("current_package.my_subscription")}
              </Text>
              <Text style={styles.heading}>
                {strings("current_package.your_current_package")}
              </Text>
              <Image
                source={
                  companySubscription.subscription.title == "Basic"
                    ? require("../../Images/Merchant/xxxhdpi/badsic.png")
                    : companySubscription.subscription.title == "Premium"
                    ? require("../../Images/Merchant/xxxhdpi/pro.png")
                    : require("../../Images/Merchant/xxxhdpi/standerd.png")
                }
                style={styles.imageCard}
              />
              <Text style={styles.heading}>
                {strings("current_package.package_expire")}{" "}
                {moment(companySubscription.expired_at).format("DD MMMM YYYY")}
              </Text>
              {COMPANY &&
                COMPANY?.subscription?.subscription_status == "expire" && (
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
              <Text style={[styles.heading, { marginTop: hp(3) }]}>
                {strings("current_package.canceltext")}
              </Text>
              <PinkButton
                onPress={() => onSubscribe()}
                style={styles.pinkBtn}
                name={strings("current_package.subscribe")}
              />
            </View>
          )
        ) : null}
      </ScrollView>
    </View>
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