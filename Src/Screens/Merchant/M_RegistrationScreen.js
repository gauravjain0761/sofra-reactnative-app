import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../Themes/Colors";
import { commonFontStyle, SCREEN_WIDTH } from "../../Themes/Fonts";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import RegistrationTextInput from "../../Components/RegistrationTextInput";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import PinkButton from "../../Components/PinkButton";
import {
  dispatchErrorAction,
  validateEmail,
  getFromDataJson,
} from "../../Services/CommonFunctions";
import { useDispatch, useSelector } from "react-redux";
import { CurrentDeliverData } from "../../Config/StaticDropdownData";
import { register } from "../../Services/AuthApi";
import { ReactNativeModal } from "react-native-modal";
import LocationGoogleInput from "../../Components/LocationGoogleInput";
import { strings } from "../../Config/I18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
export default function M_RegistrationScreen({ navigation }) {
  const dispatch = useDispatch();
  const CITIES = useSelector((e) => e.merchant.cities);
  const CUISINES = useSelector((e) => e.merchant.cuisines);
  const CATEGORIES = useSelector((e) => e.merchant.categories);
  const fcmToken = useSelector((e) => e.auth.fcmToken);
  const [BName, setBName] = useState("");
  const [BAddress, setBAddress] = useState("");
  const [city, setCity] = useState("");
  const [licenceNumber, setLicenceNUmber] = useState("");
  const [currentlyDeliver, setCurrentlyDeliver] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [restaurant, setRestaurant] = useState("Restaurant");
  const [category, setCategory] = useState("");
  const [Cuisine, setCuisine] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  const [MobileNo, setMobileNo] = useState("");
  const registerSuccess = useSelector((e) => e.auth.registerSuccess);
  const [Language, setLanguage] = useState("en");

  useEffect(() => {
    AsyncStorage.getItem("Language").then((res) => {
      setLanguage(res);
    });
  }, []);

  const onRegistration = () => {
    AsyncStorage.getItem("Language").then((res) => {
      let cityName;
      let cusineJson;
      let categoriesJson;

      if (Language == "en") {
        cityName = CITIES.filter((obj) => obj.name == city);
        cusineJson = getFromDataJson(CUISINES, Cuisine, "cusineIds");
        categoriesJson = getFromDataJson(CATEGORIES, category, "categoryIds");
      } else {
        cityName = CITIES.filter((obj) => obj.name_ar == city);
        cusineJson = getFromDataJson(CUISINES, Cuisine, "cusineIds", res);
        categoriesJson = getFromDataJson(
          CATEGORIES,
          category,
          "categoryIds",
          res
        );
      }

      let data = {
        name: BName,
        email: Email,
        first_name: Firstname,
        last_name: Lastname,
        phone: MobileNo,
        currentlyDeliver: currentlyDeliver,
        cityId: cityName[0].id,
        location: BAddress,
        licenseNo: licenceNumber,
        social_account: socialLink,
        ...cusineJson,
        ...categoriesJson,
        deviceType: Platform.OS == "android" ? "ANDROID" : "IOS",
        deviceToken: fcmToken,
        language: res,
      };
      dispatch(
        register(data, () => {
          dispatch({ type: "REGISTER_SUCCESS", payload: true });
        })
      );
    });
  };
  const validation = () => {
    if (BName.trim() !== "") {
      if (BAddress.trim() !== "") {
        if (city !== "") {
          if (licenceNumber.trim() !== "") {
            if (currentlyDeliver !== "") {
              if (category.length !== 0) {
                if (Cuisine.length !== 0) {
                  if (Firstname.trim() !== "") {
                    if (Lastname.trim() !== "") {
                      if (validateEmail(Email)) {
                        if (MobileNo.trim() !== "") {
                          onRegistration();
                        } else {
                          dispatchErrorAction(
                            dispatch,
                            strings(
                              "validationString.please_enter_mobile_number"
                            )
                          );
                        }
                      } else {
                        dispatchErrorAction(
                          dispatch,
                          strings("validationString.please_enter_valid_email")
                        );
                      }
                    } else {
                      dispatchErrorAction(
                        dispatch,
                        strings("validationString.please_enter_lastname")
                      );
                    }
                  } else {
                    dispatchErrorAction(
                      dispatch,
                      strings("validationString.please_enter_firstname")
                    );
                  }
                } else {
                  dispatchErrorAction(
                    dispatch,
                    strings("validationString.please_select_cuisine")
                  );
                }
              } else {
                dispatchErrorAction(
                  dispatch,
                  strings("validationString.please_select_category")
                );
              }
            } else {
              dispatchErrorAction(
                dispatch,
                strings("validationString.please_select_currently_deliver")
              );
            }
          } else {
            dispatchErrorAction(
              dispatch,
              strings("validationString.please_enter_trade_licence_number")
            );
          }
        } else {
          dispatchErrorAction(
            dispatch,
            strings("validationString.please_enter_city")
          );
        }
      } else {
        dispatchErrorAction(
          dispatch,
          strings("validationString.please_enter_busi_address")
        );
      }
    } else {
      dispatchErrorAction(
        dispatch,
        strings("validationString.please_enter_busi_name")
      );
    }
  };

  const onPressOk = () => {
    dispatch({ type: "REGISTER_SUCCESS", payload: false });
    navigation.goBack();
    dispatch({ type: "PRE_LOADER", payload: false });
  };
  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          {strings("SignUp.become_sofra_parter")}
        </Text>
        <RegistrationTextInput
          placeholder={`${strings("SignUp.business_name")}*`}
          value={BName}
          onChangeText={(text) => setBName(text)}
        />
        <LocationGoogleInput
          placeholder={`${strings("SignUp.business_address")}*`}
          setLocation={(location) => setBAddress(location)}
          value={BAddress}
        />
        {/* <RegistrationTextInput
          placeholder={"Business Address*"}
          value={BAddress}
          onChangeText={(text) => setBAddress(text)}
        /> */}
        <RegistrationDropdown
          data={CITIES}
          value={city}
          setData={(text) => {
            setCity(text);
          }}
          placeholder={`${strings("SignUp.city_town")}*`}
          valueField={Language == "en" ? "name" : "name_ar"}
        />
        <RegistrationTextInput
          placeholder={strings("SignUp.trade_licence_number")}
          value={licenceNumber}
          onChangeText={(text) => setLicenceNUmber(text)}
        />
        <RegistrationDropdown
          data={CurrentDeliverData}
          value={currentlyDeliver}
          setData={(text) => {
            setCurrentlyDeliver(text);
          }}
          placeholder={`${strings("SignUp.do_you_currently_deliver")}*`}
          valueField={Language == "en" ? "name" : "name_ar"}
        />
        <RegistrationTextInput
          placeholder={strings("SignUp.web_insta_face_account")}
          value={socialLink}
          onChangeText={(text) => setSocialLink(text)}
        />
        <View style={styles.row}>
          <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
            <RegistrationTextInput
              placeholder={strings("SignUp.restaurant")}
              value={"Restaurant"}
              onChangeText={(text) => setRestaurant(text)}
            />
            {/* <RegistrationDropdown
              data={citydata}
              value={restaurant}
              setData={(text) => {
                setRestaurant(text);
              }}
              placeholder={"Restaurant"}
              valueField={"strategicName"}
              style={styles.dropdownRow}
            /> */}
          </View>
          <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
            <RegistrationDropdown
              data={CATEGORIES}
              value={category}
              multiSelect={true}
              setData={(text) => {
                setCategory(text);
              }}
              placeholder={strings("SignUp.category")}
              style={styles.dropdownRow}
              valueField={Language == "en" ? "name" : "name_ar"}
            />
          </View>
        </View>
        <RegistrationDropdown
          data={CUISINES}
          value={Cuisine}
          multiSelect={true}
          setData={(text) => {
            setCuisine(text);
          }}
          placeholder={strings("SignUp.type_of_cuisine")}
          valueField={Language == "en" ? "name" : "name_ar"}
          style={styles.dropdownRow}
        />
        <View style={styles.row}>
          <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
            <RegistrationTextInput
              placeholder={`${strings("SignUp.first_name")}*`}
              value={Firstname}
              onChangeText={(text) => setFirstname(text)}
            />
          </View>
          <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
            <RegistrationTextInput
              placeholder={`${strings("SignUp.last_name")}*`}
              value={Lastname}
              onChangeText={(text) => setLastname(text)}
            />
          </View>
        </View>
        <RegistrationTextInput
          placeholder={strings("SignUp.email")}
          value={Email}
          onChangeText={(text) => setEmail(text)}
        />
        <RegistrationTextInput
          maxLength={12}
          keyboardType={"numeric"}
          placeholder={`${strings("SignUp.mobile_number")} *`}
          value={MobileNo}
          onChangeText={(text) => setMobileNo(text)}
        />

        <PinkButton
          onPress={() => validation()}
          style={styles.dbuttonStyle}
          name={strings("SignUp.submit")}
        />

        <Text style={styles.forgot2}>
          {strings("SignUp.by_clicking_submit")}{" "}
          <Text
            style={{ ...commonFontStyle(700, 14, Colors.pink) }}
            onPress={() => {}}
          >
            {strings("SignUp.terms_and_condition")}
          </Text>
        </Text>
      </ScrollView>

      <ReactNativeModal
        style={ApplicationStyles.modalStyle}
        isVisible={registerSuccess}
        onBackButtonPress={() => onPressOk()}
        onBackdropPress={() => onPressOk()}
      >
        <View
          style={[
            ApplicationStyles.modalViewStyle,
            { paddingVertical: hp(4), paddingHorizontal: hp(2) },
          ]}
        >
          <Image
            source={require("../../Images/Merchant/xxxhdpi/correct.png")}
            style={styles.icon}
          />
          <Text style={styles.title2}>
            {strings("lateral_entry.your_request_has_been_submitted")}
          </Text>

          <View style={styles.buttonRow2}>
            <View style={{ width: "50%" }}>
              <PinkButton
                onPress={() => onPressOk()}
                text={"small"}
                name={"Ok"}
              />
            </View>
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    ...commonFontStyle(700, 18, Colors.black),
    marginVertical: hp(3),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },

  dbuttonStyle: {
    marginTop: hp(5),
  },
  forgot2: {
    ...commonFontStyle(400, 14, Colors.black),
    marginVertical: hp(3),
    lineHeight: 20,
  },

  icon: {
    height: hp(10),
    width: hp(10),
    resizeMode: "contain",
    alignSelf: "center",
    tintColor: Colors.green,
  },
  title2: {
    textAlign: "center",
    ...commonFontStyle("M_500", 18, Colors.black),
    paddingVertical: hp(2),
  },
  buttonRow2: {
    alignItems: "center",
    marginTop: hp(2),
  },
});
