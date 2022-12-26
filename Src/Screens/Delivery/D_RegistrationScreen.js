import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
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
} from "../../Services/CommonFunctions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { CurrentDeliverData } from "../../Config/StaticDropdownData";
import { deliveryRegistaer } from "../../Services/AuthApi";
import { ReactNativeModal } from "react-native-modal";

export default function D_RegistrationScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [BName, setBName] = useState("");
  const [BAddress, setBAddress] = useState("");
  const [city, setCity] = useState("");
  const [licenceNumber, setLicenceNUmber] = useState("");
  const [currentlyDeliver, setCurrentlyDeliver] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  const [MobileNo, setMobileNo] = useState("");
  const CITIES = useSelector((e) => e.merchant.cities);
  const registerSuccess = useSelector((e) => e.auth.registerSuccess);
  const fcmToken = useSelector((e) => e.auth.fcmToken);

  const onRegistration = () => {
    let cityName = CITIES.filter((obj) => obj.name == city);

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
      deviceType: Platform.OS == "android" ? "ANDROID" : "IOS",
      deviceToken: fcmToken,
      language: "en",
    };
    dispatch(
      deliveryRegistaer(data, () => {
        dispatch({ type: "REGISTER_SUCCESS", payload: true });
      })
    );
  };

  const validation = () => {
    if (BName.trim() !== "") {
      if (BAddress.trim() !== "") {
        if (city !== "") {
          if (licenceNumber.trim() !== "") {
            if (currentlyDeliver !== "") {
              if (Firstname.trim() !== "") {
                if (Lastname.trim() !== "") {
                  if (validateEmail(Email)) {
                    if (MobileNo.trim() !== "") {
                      onRegistration();
                    } else {
                      dispatchErrorAction(
                        dispatch,
                        "Please enter Mobile number"
                      );
                    }
                  } else {
                    dispatchErrorAction(dispatch, "Please enter valid Email");
                  }
                } else {
                  dispatchErrorAction(dispatch, "Please enter Lastname");
                }
              } else {
                dispatchErrorAction(dispatch, "Please enter Firstname");
              }
            } else {
              dispatchErrorAction(dispatch, "Please select currently deliver");
            }
          } else {
            dispatchErrorAction(dispatch, "Please enter trade licence number");
          }
        } else {
          dispatchErrorAction(dispatch, "Please enter City");
        }
      } else {
        dispatchErrorAction(dispatch, "Please enter Business Address");
      }
    } else {
      dispatchErrorAction(dispatch, "Please enter Business Name");
    }
  };

  const onPressOk = () => {
    dispatch({ type: "REGISTER_SUCCESS", payload: false });
    dispatch({ type: "PRE_LOADER", payload: false });
    navigation.goBack();
  };

  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Become a delivery partner</Text>
        <RegistrationTextInput
          placeholder={"Business Name*"}
          value={BName}
          onChangeText={(text) => setBName(text)}
        />
        <RegistrationTextInput
          placeholder={"Business Address*"}
          value={BAddress}
          onChangeText={(text) => setBAddress(text)}
        />
        <RegistrationDropdown
          data={CITIES}
          value={city}
          setData={(text) => {
            setCity(text);
          }}
          placeholder={"City or Town*"}
          valueField={"name"}
        />
        <RegistrationTextInput
          placeholder={"Trade Licence number"}
          value={licenceNumber}
          onChangeText={(text) => setLicenceNUmber(text)}
        />
        <RegistrationDropdown
          data={CurrentDeliverData}
          value={currentlyDeliver}
          setData={(text) => {
            setCurrentlyDeliver(text);
          }}
          placeholder={"Do you currently deliver?*"}
          valueField={"name"}
        />
        <RegistrationTextInput
          placeholder={"Website, Instagram, Facebook account"}
          value={socialLink}
          onChangeText={(text) => setSocialLink(text)}
        />

        <View style={styles.row}>
          <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
            <RegistrationTextInput
              placeholder={"First name*"}
              value={Firstname}
              onChangeText={(text) => setFirstname(text)}
            />
          </View>
          <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
            <RegistrationTextInput
              placeholder={"Last name*"}
              value={Lastname}
              onChangeText={(text) => setLastname(text)}
            />
          </View>
        </View>
        <RegistrationTextInput
          placeholder={"Email"}
          value={Email}
          onChangeText={(text) => setEmail(text)}
        />
        <RegistrationTextInput
          keyboardType={"numeric"}
          placeholder={"Mobile number (+971...)*"}
          value={MobileNo}
          onChangeText={(text) => setMobileNo(text)}
          maxLength={12}
        />

        <PinkButton
          onPress={() => validation()}
          style={styles.dbuttonStyle}
          name={"Submit"}
        />

        <Text style={styles.forgot2}>
          By clicking 'Submit', I hereby acknowledge & agree that I have read &
          understood Sofra{" "}
          <Text
            style={{ ...commonFontStyle(700, 14, Colors.pink) }}
            onPress={() => {}}
          >
            Terms and Conditions
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
            {"Your request has been submitted. We will get back to you soon."}
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
