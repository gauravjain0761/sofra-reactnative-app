import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
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
const citydata = [
  {
    id: 1,
    strategicName: "SUPERTREND",
  },
  { id: 2, strategicName: "VWAP" },
  { id: 3, strategicName: "RSIMA" },
  { id: 6, strategicName: "TESTING" },
  { id: 10, strategicName: "DEMATADE" },
];
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

  const onRegistration = () => {
    if (BName.trim() !== "") {
      if (BAddress.trim() !== "") {
        if (city !== "") {
          if (licenceNumber.trim() !== "") {
            if (currentlyDeliver !== "") {
              if (socialLink.trim() !== "") {
                if (category.length !== 0) {
                  if (Cuisine.length !== 0) {
                    if (Firstname.trim() !== "") {
                      if (Lastname.trim() !== "") {
                        if (validateEmail(Email)) {
                          if (MobileNo.trim() !== "") {
                            let cityName = CITIES.filter(
                              (obj) => obj.name == city
                            );
                            let cusineJson = getFromDataJson(
                              CUISINES,
                              Cuisine,
                              "cusineIds"
                            );
                            let categoriesJson = getFromDataJson(
                              CATEGORIES,
                              category,
                              "categoryIds"
                            );
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
                              deviceType:
                                Platform.OS == "android" ? "ANDROID" : "IOS",
                              deviceToken: fcmToken,
                              language: "en",
                            };
                            dispatch(register(data, navigation));
                          } else {
                            dispatchErrorAction(
                              dispatch,
                              "Please enter Mobile number"
                            );
                          }
                        } else {
                          dispatchErrorAction(
                            dispatch,
                            "Please enter valid Email"
                          );
                        }
                      } else {
                        dispatchErrorAction(dispatch, "Please enter Lastname");
                      }
                    } else {
                      dispatchErrorAction(dispatch, "Please enter Firstname");
                    }
                  } else {
                    dispatchErrorAction(dispatch, "Please select cuisine");
                  }
                } else {
                  dispatchErrorAction(dispatch, "Please select category");
                }
              } else {
                dispatchErrorAction(
                  dispatch,
                  "Please enter your website, facebook, instagram account"
                );
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

  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Become a Sofra partner</Text>
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
              placeholder={"Restaurant"}
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
              placeholder={"Category"}
              valueField={"name"}
              style={styles.dropdownRow}
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
          placeholder={"Type of Cuisine"}
          valueField={"name"}
          style={styles.dropdownRow}
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
          maxLength={12}
          keyboardType={"numeric"}
          placeholder={"Mobile number (+971...)*"}
          value={MobileNo}
          onChangeText={(text) => setMobileNo(text)}
        />

        <PinkButton
          onPress={() => onRegistration()}
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
});
