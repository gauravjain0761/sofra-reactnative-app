import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
  Switch,
} from "react-native";
import React, { useState, useEffect } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle, SCREEN_WIDTH } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import RegistrationTextInput from "../../Components/RegistrationTextInput";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import ImagePicker from "react-native-image-crop-picker";
import PinkButton from "../../Components/PinkButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurnatDetails,
  updateProfile,
} from "../../Services/MerchantApi";
import { media_url } from "../../Config/AppConfig";
import { vatType } from "../../Config/StaticDropdownData";
import {
  dispatchErrorAction,
  getFromDataJson,
} from "../../Services/CommonFunctions";

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
export default function M_ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const [firstname, setfirstname] = useState("Jasica");
  const [lastname, setlastname] = useState("Birnilvis");
  const [phoneNumber, setphoneNumber] = useState("");
  const [businessName, setbusinessName] = useState("");
  const [arabicBName, setarabicBName] = useState("");
  const [b_category, setb_category] = useState("");
  const [VATtype, setVATtype] = useState("");
  const [deliveryTime, setdeliveryTime] = useState("");
  const [city, setcity] = useState("");
  const [cuisine, setcuisine] = useState("");
  const [image, setimage] = useState("");
  const [profileImage, setprofileImage] = useState("");
  const [des, setdes] = useState("");
  const [arabicDes, setarabicDes] = useState("");
  const [location, setlocation] = useState("");
  const [reportNoti, setreportNoti] = useState("");
  const [orderNoti, setorderNoti] = useState("");
  const [notification, setnotification] = useState("");
  const RESTAURANT = useSelector((e) => e.merchant.restaurant);
  const CITIES = useSelector((e) => e.merchant.cities);
  const CUISINES = useSelector((e) => e.merchant.cuisines);
  const CATEGORIES = useSelector((e) => e.merchant.categories);
  const fcmToken = useSelector((e) => e.auth.fcmToken);
  useEffect(() => {
    dispatch({ type: "PRE_LOADER", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getRestaurnatDetails());
    });
  }, []);

  const getArray = (mainArray, filed) => {
    let temp = [];
    mainArray.length !== 0 &&
      mainArray.map((element) => temp.push(element[filed]));
    return temp;
  };
  useEffect(() => {
    console.log(RESTAURANT);
    if (RESTAURANT !== {} && Object.keys(RESTAURANT).length !== 0) {
      let city = CITIES.filter((obj) => obj.id == RESTAURANT.cityId);
      setfirstname(RESTAURANT.first_name);
      setlastname(RESTAURANT.last_name);
      setphoneNumber(RESTAURANT.phone);
      setbusinessName(RESTAURANT.name);
      setarabicBName(RESTAURANT.name_ar);
      setb_category(getArray(RESTAURANT.categories, "name"));
      setVATtype(RESTAURANT.vatType);
      setdeliveryTime(RESTAURANT.deliveryTime);
      setcity(city[0].name);
      setcuisine(getArray(RESTAURANT.cusinies, "name"));
      setimage(RESTAURANT.image);
      setdes(RESTAURANT.description);
      setarabicDes(RESTAURANT.description_ar);
      setlocation(RESTAURANT.location);
    }
  }, [RESTAURANT]);

  const openPicker = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      includeBase64: true,
    }).then((photo) => {
      setimage(photo);
    });
  };

  const onUpdateProfile = () => {
    let cityName = CITIES.filter((obj) => obj.name == city);
    let cusineJson = getFromDataJson(CUISINES, cuisine, "cusineIds");
    let categoriesJson = getFromDataJson(CATEGORIES, b_category, "categoryIds");
    let data = {};
    if (image.sourceURL) {
      data = {
        name: businessName,
        name_ar: arabicBName,
        first_name: firstname,
        last_name: lastname,
        phone: phoneNumber,
        description: des,
        description_ar: arabicDes,
        location: location,
        cityId: cityName[0].id,
        deliveryTime: deliveryTime,
        vatType: vatType,
        image: {
          uri: image.sourceURL,
          type: image.mime, // or photo.type image/jpg
          name:
            "image_" + moment().unix() + "_" + image.sourceURL.split("/").pop(),
        },
        ...cusineJson,
        ...categoriesJson,
        deviceType: Platform.OS == "android" ? "ANDROID" : "IOS",
        deviceToken: fcmToken,
        language: "en",
      };
    } else {
      data = {
        name: businessName,
        name_ar: arabicBName,
        first_name: firstname,
        last_name: lastname,
        phone: phoneNumber,
        description: des,
        description_ar: arabicDes,
        location: location,
        cityId: cityName[0].id,
        deliveryTime: deliveryTime,
        vatType: VATtype,
        ...cusineJson,
        ...categoriesJson,
        deviceType: Platform.OS == "android" ? "ANDROID" : "IOS",
        deviceToken: fcmToken,
        language: "en",
      };
    }
    console.log(data);
    dispatch(updateProfile(data));
  };

  const validation = () => {
    if (firstname.trim() !== "") {
      if (lastname.trim() !== "") {
        if (phoneNumber.trim() !== "") {
          if (businessName.trim() !== "") {
            if (arabicBName !== "") {
              if (b_category.length !== 0) {
                if (vatType !== "") {
                  if (deliveryTime !== "") {
                    if (city !== "") {
                      if (cuisine.length !== 0) {
                        if (image !== "") {
                          if (des.trim() !== "") {
                            if (arabicDes.trim() !== "") {
                              if (location.trim() !== "") {
                                onUpdateProfile();
                              } else {
                                dispatchErrorAction(
                                  dispatch,
                                  "Please enter location"
                                );
                              }
                            } else {
                              dispatchErrorAction(
                                dispatch,
                                "Please enter Description in arabic"
                              );
                            }
                          } else {
                            dispatchErrorAction(
                              dispatch,
                              "Please enter Description"
                            );
                          }
                        } else {
                          dispatchErrorAction(dispatch, "Please select Image");
                        }
                      } else {
                        dispatchErrorAction(dispatch, "Please select Cuisine");
                      }
                    } else {
                      dispatchErrorAction(dispatch, "Please select City");
                    }
                  } else {
                    dispatchErrorAction(
                      dispatch,
                      "Please select Delivery time"
                    );
                  }
                } else {
                  dispatchErrorAction(dispatch, "Please select VAT type");
                }
              } else {
                dispatchErrorAction(dispatch, "Please select category");
              }
            } else {
              dispatchErrorAction(
                dispatch,
                "Please enter Business name in arabic"
              );
            }
          } else {
            dispatchErrorAction(dispatch, "Please enter Business name");
          }
        } else {
          dispatchErrorAction(dispatch, "Please enter Phone number");
        }
      } else {
        dispatchErrorAction(dispatch, "Please enter Lastname");
      }
    } else {
      dispatchErrorAction(dispatch, "Please enter Firstname");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={ApplicationStyles.mainView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Image
              style={styles.drawerImage}
              source={
                RESTAURANT !== {}
                  ? { uri: media_url + image }
                  : require("../../Images/Merchant/xxxhdpi/bg_profile.png")
              }
            />
            <Text style={styles.name}>
              {RESTAURANT !== {} ? RESTAURANT.name : ""}
            </Text>
          </View>
          <View>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.title2}>Personal Info</Text>
            <View>
              <View style={styles.row}>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationTextInput
                    placeholder={"Enter Firstname"}
                    value={firstname}
                    onChangeText={(text) => setfirstname(text)}
                  />
                </View>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationTextInput
                    placeholder={"Enter Lastname"}
                    value={lastname}
                    onChangeText={(text) => setlastname(text)}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationTextInput
                    keyboardType={"numeric"}
                    placeholder={"Phone Number"}
                    value={phoneNumber}
                    onChangeText={(text) => setphoneNumber(text)}
                    placeholderTextColor={Colors.black}
                  />
                </View>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationTextInput
                    placeholder={"Business Name"}
                    value={businessName}
                    onChangeText={(text) => setbusinessName(text)}
                    placeholderTextColor={Colors.black}
                  />
                </View>
              </View>
              <RegistrationTextInput
                placeholder={"Business name in Arabic"}
                value={arabicBName}
                onChangeText={(text) => setarabicBName(text)}
                placeholderTextColor={Colors.black}
              />
            </View>

            <Text style={styles.title}>Business Info</Text>
            <View>
              <RegistrationDropdown
                data={CATEGORIES}
                value={b_category}
                setData={(text) => {
                  setb_category(text);
                }}
                multiSelect={true}
                placeholder={"Business Categories"}
                valueField={"name"}
                style={styles.dropdownRow}
                placeholderTextColor={Colors.black}
              />
              <View style={styles.row}>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationDropdown
                    data={vatType}
                    value={VATtype}
                    setData={(text) => {
                      setVATtype(text);
                    }}
                    placeholder={VATtype !== "" ? VATtype : "VAT Type"}
                    valueField={"name"}
                    style={styles.dropdownRow}
                    placeholderTextColor={Colors.black}
                  />
                </View>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationDropdown
                    data={citydata}
                    value={deliveryTime}
                    setData={(text) => {
                      setdeliveryTime(text);
                    }}
                    placeholder={"Delivery Time"}
                    valueField={"strategicName"}
                    style={styles.dropdownRow}
                    placeholderTextColor={Colors.black}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationDropdown
                    data={CITIES}
                    value={city}
                    setData={(text) => {
                      setcity(text);
                    }}
                    placeholder={"City"}
                    valueField={"name"}
                    style={styles.dropdownRow}
                    placeholderTextColor={Colors.black}
                  />
                </View>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationDropdown
                    data={CUISINES}
                    value={cuisine}
                    setData={(text) => {
                      setcuisine(text);
                    }}
                    placeholder={"Cuisine"}
                    valueField={"name"}
                    multiSelect={true}
                    style={styles.dropdownRow}
                    placeholderTextColor={Colors.black}
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={() => openPicker()}
                style={styles.imageView}
              >
                {image == "" ? (
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={require("../../Images/Merchant/xxxhdpi/ic_attach.png")}
                      style={styles.imageVector}
                    />
                    <Text style={styles.attachText}>Attach Image</Text>
                  </View>
                ) : (
                  <View>
                    <Image
                      source={{
                        uri: image.data
                          ? `data:image/jpeg;base64,${image.data}`
                          : media_url + image,
                      }}
                      style={styles.image}
                    />
                  </View>
                )}
              </TouchableOpacity>

              <View>
                <Text style={styles.titleInput}>Description</Text>
                <TextInput
                  value={des}
                  onChangeText={(text) => setdes(text)}
                  multiline={true}
                  style={styles.textInput}
                  placeholder={"Description"}
                  placeholderTextColor={Colors.black}
                  textAlignVertical={"top"}
                />
              </View>
              <View>
                <Text style={styles.titleInput}>Description in Arabic</Text>
                <TextInput
                  value={arabicDes}
                  onChangeText={(text) => setarabicDes(text)}
                  multiline={true}
                  style={styles.textInput}
                  placeholder={"Description"}
                  placeholderTextColor={Colors.black}
                  textAlignVertical={"top"}
                />
              </View>
              <RegistrationTextInput
                placeholder={"Locations"}
                value={location}
                onChangeText={(text) => setlocation(text)}
                placeholderTextColor={Colors.black}
              />
            </View>
            <Text style={styles.title}>Notifications</Text>
            <View>
              <View style={styles.row}>
                <Text style={[styles.title2, { marginBottom: 0 }]}>
                  Reports
                </Text>
                <Switch
                  ios_backgroundColor={"#cccccc"}
                  trackColor={{
                    false: Colors.placeholderColor,
                    true: Colors.pink,
                  }}
                  thumbColor={reportNoti ? Colors.white : Colors.darkGrey}
                  style={{
                    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                    marginTop: 0,
                  }}
                  onValueChange={() => setreportNoti(!reportNoti)}
                  value={reportNoti}
                />
              </View>
              <View style={styles.row}>
                <Text style={[styles.title2, { marginBottom: 0 }]}>Orders</Text>
                <Switch
                  ios_backgroundColor={"#cccccc"}
                  trackColor={{
                    false: Colors.placeholderColor,
                    true: Colors.pink,
                  }}
                  style={{
                    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                    marginTop: 0,
                  }}
                  thumbColor={orderNoti ? Colors.white : Colors.darkGrey}
                  onValueChange={() => setorderNoti(!orderNoti)}
                  value={orderNoti}
                />
              </View>
              <View style={styles.row}>
                <Text style={[styles.title2, { marginBottom: 0 }]}>
                  Notifications
                </Text>
                <Switch
                  ios_backgroundColor={"#cccccc"}
                  trackColor={{
                    false: Colors.placeholderColor,
                    true: Colors.pink,
                  }}
                  style={{
                    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                    marginTop: 0,
                  }}
                  thumbColor={notification ? Colors.white : Colors.darkGrey}
                  onValueChange={() => setnotification(!notification)}
                  value={notification}
                />
              </View>
            </View>
            <View style={styles.buttonRow}>
              <View style={styles.row}>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <PinkButton
                    onPress={() => {
                      validation();
                    }}
                    style={styles.dbuttonStyle}
                    text={"small"}
                    name={"Save"}
                  />
                </View>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <PinkButton
                    onPress={() => {}}
                    style={styles.dbuttonStyle}
                    text={"small"}
                    name={"Cancel"}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginTop: 13,
  },
  drawerImage: {
    resizeMode: "cover",
    height: hp(15),
    width: hp(15),
    borderRadius: hp(15) / 2,
  },
  name: {
    ...commonFontStyle(600, hp(2.5), Colors.black),
    marginVertical: hp(2),
  },
  headerRightView: {
    position: "absolute",
    zIndex: 1,
    left: 0,
  },
  title: {
    ...commonFontStyle(700, 18, Colors.black),
    marginBottom: hp(1.5),
    marginTop: hp(3),
  },
  title2: { ...commonFontStyle(500, 16, Colors.pink), marginBottom: hp(3) },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
  nameUser: {},
  textView: {
    width: (SCREEN_WIDTH - hp(6)) / 2,
    height: hp(6),
    backgroundColor: Colors.white,
    justifyContent: "center",
    paddingHorizontal: hp(1.5),
    borderRadius: 5,
  },
  imageView: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: hp(17),
    borderColor: Colors.placeholderColor,
    borderWidth: 1,
    borderStyle: "dashed",
    marginBottom: hp(2),
    overflow: "hidden",
  },
  imageVector: {
    width: hp(6),
    // height: hp(6),
    height: hp(6),
    resizeMode: "contain",
  },
  image: {
    height: hp(17),
    resizeMode: "cover",
    width: SCREEN_WIDTH - hp(4),
  },
  attachText: {
    ...commonFontStyle(400, 12, Colors.darkGrey),
    marginTop: hp(1),
  },
  titleInput: {
    ...commonFontStyle(500, 14, Colors.pink),
    marginBottom: 10,
    marginTop: 5,
  },
  textInput: {
    ...commonFontStyle(400, 14, Colors.black),
    backgroundColor: Colors.white,
    marginBottom: hp(2),
    width: "100%",
    height: hp(12),
    padding: hp(2),
    borderRadius: 5,
  },
  buttonRow: {
    marginVertical: hp(3),
  },
});
