import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  I18nManager,
  ImageBackground,
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
import { media_url } from "../../Config/AppConfig";
import UpgradeModal from "../../Components/UpgradeModal";

export default function M_CurrentPackageScreen() {
  const numArray = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']
  const numArray_ar = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const merchantSubscription = useSelector(
    (e) => e.merchant.merchantSubscription
  );
  const merchantOtherPackage = useSelector(e => e.merchant.merchantOtherPackage)
  const RESTAURANT = useSelector((e) => e.merchant.restaurant);
  const isFocused = useIsFocused();
  const [canpopup, setcanpopup] = useState(false);
  const [upgradePopup, setupgradePopup] = useState(false);
  const [selectedUpgradeItem, setselectedUpgradeItem] = useState({});
  useEffect(() => {
    if (isFocused == true) {
      dispatch(getMySubscription());
    }
  }, [isFocused]);

  const onCancel = () => {
    setcanpopup(true);
  };

  const onSubscribe = () => {
    navigation.navigate("ChoosePackageScreen", {
      staffId: RESTAURANT.staffId,
      screen: "M_CurrentPackageScreen",
    });
  };

  const onPressUpgrade = (item) => {
    setupgradePopup(false)
    const lan = I18nManager.isRTL ? 'ar' : 'en'
    navigation.navigate("ChoosePackageScreen", {
      staffId: RESTAURANT.staffId,
      screen: "M_CurrentPackageScreen",
      url: `https://www.mysofra.com/cards?plan=${item.id}&merchant=${RESTAURANT.staffId}&language=${lan}`
    });
  }

  console.log('merchantSubscription--', merchantSubscription)

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

              <ImageBackground source={{ uri: media_url + merchantSubscription.subscription.bg_image }}
                style={styles.imageCard}>
                <Text style={{ ...commonFontStyle(600, 35, Colors.white), }}>{I18nManager.isRTL ? merchantSubscription.subscription.title_ar : merchantSubscription.subscription.title.toUpperCase()}</Text>
                <Text style={{ ...commonFontStyle(500, 17, Colors.white), }}>{merchantSubscription.subscription.months} {strings("current_package.month_package")}</Text>

                <View style={{
                  position: 'absolute',
                  bottom: hp(1), right: hp(2)
                }}>
                  <Text style={{ ...commonFontStyle(700, 35, 'rgba(255,255,255,0.2)'), }}>{I18nManager.isRTL ? merchantSubscription.subscription.title_ar : merchantSubscription.subscription.title.toUpperCase()}</Text>
                </View>
              </ImageBackground>
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
              <View>
                <Text style={styles.heading2}>{strings("current_package.Other_packages")}</Text>
                {merchantOtherPackage && merchantOtherPackage.map((item, index) => {
                  console.log('media_url + item.bg_image', media_url + item.bg_image)
                  return (
                    <View>
                      <ImageBackground source={{ uri: media_url + item.bg_image }} style={styles.imagebg}>
                        <View style={styles.rowView}>
                          <Text style={[styles.heading3,]}>{I18nManager.isRTL ? item.title_ar : item.title} ({item.price} AED & {item.months} {strings("current_package.Month")})</Text>
                          {/* <TouchableOpacity onPress={() => onPressUpgrade(item)}>
                            <Text style={styles.upgradeBtn}>{strings("current_package.Upgrade")}</Text>
                          </TouchableOpacity> */}
                        </View>
                        <View>
                          {I18nManager.isRTL ? item.features_ar.map((element, i) => {
                            return (
                              <Text style={styles.features}>{element}</Text>
                            )
                          }) : item.features.map((element, i) => {
                            return (
                              <Text style={styles.features}>{element}</Text>
                            )
                          })}
                        </View>
                        <TouchableOpacity style={styles.upgradeView} onPress={() => { setupgradePopup(true), setselectedUpgradeItem(item) }}>
                          <Text style={styles.upgradeBtn}>{strings("current_package.Upgrade")}</Text>
                        </TouchableOpacity>
                      </ImageBackground>
                    </View>
                  )
                })}
              </View>
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
                  <ImageBackground source={{ uri: media_url + merchantSubscription.subscription.bg_image }}
                    style={styles.imageCard}>
                    <Text style={{ ...commonFontStyle(600, 35, Colors.white), }}>{I18nManager.isRTL ? merchantSubscription.subscription.title_ar : merchantSubscription.subscription.title.toUpperCase()}</Text>
                    <Text style={{ ...commonFontStyle(500, 17, Colors.white), }}>{merchantSubscription.subscription.months} {strings("current_package.month_package")}</Text>

                    <View style={{
                      position: 'absolute',
                      bottom: hp(1), right: hp(2)
                    }}>
                      <Text style={{ ...commonFontStyle(700, 35, 'rgba(255,255,255,0.2)'), }}>{I18nManager.isRTL ? merchantSubscription.subscription.title_ar : merchantSubscription.subscription.title.toUpperCase()}</Text>
                    </View>
                  </ImageBackground>
                  <Text style={styles.heading}>
                    {strings("current_package.package_expire")}{" "}
                    {moment(merchantSubscription.expired_at).format(
                      "DD MMMM YYYY"
                    )}
                  </Text>
                  <View>
                    <Text style={styles.heading2}>{strings("current_package.Other_packages")}</Text>
                    {merchantOtherPackage && merchantOtherPackage.map((item, index) => {
                      return (
                        <View>
                          <ImageBackground source={{ uri: media_url + item.bg_image }} style={styles.imagebg}>
                            <View style={styles.rowView}>
                              <Text style={[styles.heading3,]}>{I18nManager.isRTL ? item.title_ar : item.title} ({item.price} AED & {item.months} {strings("current_package.Month")})</Text>
                            </View>
                            <View>
                              {I18nManager.isRTL ? item.features_ar.map((element, i) => {
                                return (
                                  <Text style={styles.features}>{element}</Text>
                                )
                              }) : item.features.map((element, i) => {
                                return (
                                  <Text style={styles.features}>{element}</Text>
                                )
                              })}
                            </View>
                            <TouchableOpacity style={styles.upgradeView} onPress={() => onPressUpgrade(item)}>
                              <Text style={styles.upgradeBtn}>{strings("current_package.Upgrade")}</Text>
                            </TouchableOpacity>
                          </ImageBackground>
                        </View>
                      )
                    })}
                  </View>
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
        <UpgradeModal
          isVisible={upgradePopup}
          onClose={() => setupgradePopup(false)}
          onUpgrade={() => {
            onPressUpgrade(selectedUpgradeItem)
          }}
        />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  heading: {
    ...commonFontStyle(400, 16, Colors.black),
  },
  heading3: {
    ...commonFontStyle(600, 17, Colors.white),
    // maxWidth: '76%',
    paddingHorizontal: hp(2),
    paddingTop: hp(2),
    marginBottom: hp(1)
  },
  heading2: {
    ...commonFontStyle(600, 16, Colors.black),
    marginVertical: hp(2)
  },
  cancelbtn: {
    marginTop: 10,
    paddingVertical: hp(1),
  },
  btnText: {
    textAlign: "center",
    ...commonFontStyle(400, 15, Colors.black),
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
    marginVertical: hp(2),
    paddingHorizontal: hp(2),
    paddingVertical: hp(1)
  },
  rowView: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',

  },
  upgradeBtn: {
    ...commonFontStyle(600, 16, Colors.white),
  },
  features: {
    ...commonFontStyle(400, 13.5, 'rgba(255,255,255,0.6)'),
    paddingHorizontal: hp(2),
  },
  imagebg: {
    marginBottom: hp(2),
    borderRadius: 10,
    overflow: "hidden"
  },
  upgradeView: {
    alignItems: "center",
    paddingTop: hp(2),
    paddingBottom: hp(2),
    borderTopWidth: 1,
    marginTop: hp(1.5),
    borderColor: 'rgba(255,255,255,0.6)',
  }
});
