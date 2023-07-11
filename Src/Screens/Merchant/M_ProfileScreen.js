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
  I18nManager,
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
  updateNotificationSetting,
  updateProfile,
} from "../../Services/MerchantApi";
import { media_url } from "../../Config/AppConfig";
import { deliveryTimeData, vatType } from "../../Config/StaticDropdownData";
import {
  dispatchErrorAction,
  getFromDataJson,
} from "../../Services/CommonFunctions";
import LocationGoogleInput from "../../Components/LocationGoogleInput";
import { strings } from "../../Config/I18n";
import { getLanguage } from "../../Services/asyncStorage";
import moment from "moment";
export default function M_ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
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
  const [orderNoti, setorderNoti] = useState("");
  const RESTAURANT = useSelector((e) => e.merchant.restaurant);
  const CITIES = useSelector((e) => e.merchant.cities);
  const CUISINES = useSelector((e) => e.merchant.cuisines);
  const CATEGORIES = useSelector((e) => e.merchant.categories);
  const fcmToken = useSelector((e) => e.auth.fcmToken);
  const [timeData, settimeData] = useState([]);
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");
  const [language, setlanguage] = useState("en");
  useEffect(async () => {
    let lang = await getLanguage();
    setlanguage(lang);
  }, []);
  useEffect(() => {
    dispatch({ type: "PRE_LOADER", payload: true });
    settimeData(deliveryTimeData());
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
    if (
      RESTAURANT !== {} &&
      Object.keys(RESTAURANT).length !== 0 &&
      timeData.length !== 0 &&
      CITIES.length !== 0
    ) {
      let city = CITIES.filter((obj) => obj.id == RESTAURANT.cityId);
      let deliveryTime = timeData.filter(
        (obj) => obj.name == RESTAURANT.deliveryTime
      );
      setfirstname(RESTAURANT.first_name);
      setlastname(RESTAURANT.last_name);
      setphoneNumber(RESTAURANT.phone);
      setbusinessName(RESTAURANT.name);
      setarabicBName(RESTAURANT.name_ar);
      setb_category(getArray(RESTAURANT.categories, "name"));
      setVATtype(RESTAURANT.vatType);
      setdeliveryTime(deliveryTime.length !== 0 ? deliveryTime[0].name : "");
      setcity(language == "en" ? city[0].name : city[0].name_ar);
      setcuisine(getArray(RESTAURANT.cusinies, "name"));
      setimage(RESTAURANT.image);
      setdes(RESTAURANT.description);
      setarabicDes(RESTAURANT.description_ar);
      setlocation(RESTAURANT.location);
      setorderNoti(RESTAURANT.orderNotifications);
      setlat(RESTAURANT.lat ? Number(RESTAURANT.lat) : "");
      setlong(RESTAURANT.lng ? Number(RESTAURANT.lng) : "");
    }
  }, [RESTAURANT, timeData, CITIES]);

  const openPicker = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      includeBase64: true,
    }).then((photo) => {
      if (Platform.OS == "android") {
        photo.sourceURL = photo.path;
      }
      setimage(photo);
    });
  };

  const onUpdateProfile = () => {
    let cityName;
    let cusineJson;
    let categoriesJson;

    if (language == "en") {
      cityName = CITIES.filter((obj) => obj.name == city);
      cusineJson = getFromDataJson(CUISINES, cuisine, "cusineIds");
      categoriesJson = getFromDataJson(CATEGORIES, b_category, "categoryIds");
    } else {
      cityName = CITIES.filter((obj) => obj.name_ar == city);
      cusineJson = getFromDataJson(CUISINES, cuisine, "cusineIds", language);
      categoriesJson = getFromDataJson(
        CATEGORIES,
        b_category,
        "categoryIds",
        language
      );
    }

    // let cityName = CITIES.filter((obj) => obj.name == city);
    // let cusineJson = getFromDataJson(CUISINES, cuisine, "cusineIds");
    // let categoriesJson = getFromDataJson(CATEGORIES, b_category, "categoryIds");
    let data = {};

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
      image: image.sourceURL
        ? {
            uri: image.sourceURL,
            type: image.mime, // or photo.type image/jpg
            name:
              "image_" +
              moment().unix() +
              "_" +
              image.sourceURL.split("/").pop(),
          }
        : undefined,
      ...cusineJson,
      ...categoriesJson,
      lat: String(lat),
      lng: String(long),
      deviceType: Platform.OS == "android" ? "ANDROID" : "IOS",
      deviceToken: fcmToken,
      language: language,
    };
    dispatch(updateProfile(data));
  };

  const validation = () => {
    if (firstname.trim() !== "") {
      if (lastname.trim() !== "") {
        if (phoneNumber.trim() !== "") {
          if (businessName.trim() !== "") {
            if (arabicBName.trim() !== "") {
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
                                  strings(
                                    "validationString.please_enter_location"
                                  )
                                );
                              }
                            } else {
                              dispatchErrorAction(
                                dispatch,
                                strings(
                                  "validationString.please_enter_description_in_arabic"
                                )
                              );
                            }
                          } else {
                            dispatchErrorAction(
                              dispatch,
                              strings(
                                "validationString.please enter_description"
                              )
                            );
                          }
                        } else {
                          dispatchErrorAction(
                            dispatch,
                            strings("validationString.please_select_image")
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
                        strings("validationString.please_select_city")
                      );
                    }
                  } else {
                    dispatchErrorAction(
                      dispatch,
                      strings("validationString.please_select_delivery_time")
                    );
                  }
                } else {
                  dispatchErrorAction(
                    dispatch,
                    strings("validationString.please_select_vat")
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
                strings("validationString.please_enter_business_in_arabic")
              );
            }
          } else {
            dispatchErrorAction(
              dispatch,
              strings("validationString.please_enter_busi_name")
            );
          }
        } else {
          dispatchErrorAction(
            dispatch,
            strings("validationString.please_enter_mobile_number")
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
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={ApplicationStyles.mainView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={true}
        >
          <View style={styles.header}>
            <Image
              style={styles.drawerImage}
              source={
                RESTAURANT !== {} &&
                RESTAURANT.image &&
                RESTAURANT.image !== "" &&
                RESTAURANT.image !== null
                  ? { uri: media_url + image }
                  : require("../../Images/Delivery/xxxhdpi/profile_placeholder.png")
              }
            />
            <Text style={styles.name}>
              {RESTAURANT !== {}
                ? language == "en"
                  ? RESTAURANT.name
                  : RESTAURANT.name_ar && RESTAURANT.name_ar !== ""
                  ? RESTAURANT.name_ar
                  : RESTAURANT.name
                : ""}
            </Text>
          </View>

          <View>
            <Text style={styles.title}>{strings("profile.profile")}</Text>
            <Text style={styles.title2}>
              {strings("profile.personal_info")}
            </Text>
            <View>
              <View style={styles.row}>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationTextInput
                    placeholder={strings("profile.enter_firstname")}
                    value={firstname}
                    onChangeText={(text) => setfirstname(text)}
                  />
                </View>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationTextInput
                    placeholder={strings("profile.enter_lastname")}
                    value={lastname}
                    onChangeText={(text) => setlastname(text)}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationTextInput
                    keyboardType={"numeric"}
                    placeholder={strings("profile.phone_num")}
                    value={phoneNumber}
                    onChangeText={(text) => setphoneNumber(text)}
                    placeholderTextColor={Colors.black}
                  />
                </View>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationTextInput
                    placeholder={strings("profile.business_name")}
                    value={businessName}
                    onChangeText={(text) => setbusinessName(text)}
                    placeholderTextColor={Colors.black}
                  />
                </View>
              </View>
              <RegistrationTextInput
                placeholder={strings("profile.business_name_in_arabic")}
                value={arabicBName}
                onChangeText={(text) => setarabicBName(text)}
                placeholderTextColor={Colors.black}
              />
            </View>

            <Text style={styles.title}>{strings("profile.business_info")}</Text>
            <View>
              <RegistrationDropdown
                data={CATEGORIES}
                value={b_category}
                setData={(text) => {
                  setb_category(text);
                }}
                multiSelect={true}
                placeholder={strings("profile.business_categories")}
                valueField={language == "en" ? "name" : "name_ar"}
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
                    placeholder={
                      VATtype !== "" ? VATtype : strings("profile.vat_type")
                    }
                    valueField={"name"}
                    labelField={language == "en" ? "label" : "name_ar"}
                    style={styles.dropdownRow}
                    placeholderTextColor={Colors.black}
                  />
                </View>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationDropdown
                    data={timeData}
                    value={deliveryTime}
                    setData={(text) => {
                      setdeliveryTime(text);
                    }}
                    placeholder={strings("profile.delivery_time")}
                    valueField={"name"}
                    labelField={"label"}
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
                    placeholder={strings("profile.city")}
                    valueField={language == "en" ? "name" : "name_ar"}
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
                    placeholder={strings("profile.cuisine")}
                    valueField={language == "en" ? "name" : "name_ar"}
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
                {image == "" || image == null ? (
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={require("../../Images/Merchant/xxxhdpi/ic_attach.png")}
                      style={styles.imageVector}
                    />
                    <Text style={styles.attachText}>
                      {strings("profile.attach_image")}
                    </Text>
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
                <Text style={styles.titleInput}>
                  {strings("profile.description")}
                </Text>
                <TextInput
                  value={des}
                  onChangeText={(text) => setdes(text)}
                  multiline={true}
                  style={styles.textInput}
                  placeholder={strings("profile.description")}
                  placeholderTextColor={Colors.black}
                  textAlignVertical={"top"}
                />
              </View>
              <View>
                <Text style={styles.titleInput}>
                  {strings("profile.descripition_in_arabic")}
                </Text>
                <TextInput
                  value={arabicDes}
                  onChangeText={(text) => setarabicDes(text)}
                  multiline={true}
                  style={styles.textInput}
                  placeholder={strings("profile.description")}
                  placeholderTextColor={Colors.black}
                  textAlignVertical={"top"}
                />
              </View>

              <LocationGoogleInput
                placeholder={strings("profile.locations")}
                value={location}
                screen={"company"}
                setText={(location) => setlocation(location)}
                setLocation={(location) => {
                  setlocation(location.data.description);
                  setlat(location.details.geometry.location.lat);
                  setlong(location.details.geometry.location.lng);
                }}
              />

              {/* <RegistrationTextInput
                placeholder={"Locations"}
                value={location}
                onChangeText={(text) => setlocation(text)}
                placeholderTextColor={Colors.black}
              /> */}
            </View>
            <Text style={styles.title}>{strings("profile.Notifications")}</Text>
            <View>
              <View style={styles.row}>
                <Text style={[styles.title2, { marginBottom: 0 }]}>
                  {strings("profile.orders")}
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
                  thumbColor={orderNoti ? Colors.white : Colors.darkGrey}
                  onValueChange={(value) => {
                    setorderNoti(value);
                    let data = {
                      orderNotifications: value == true ? 1 : 0,
                    };
                    dispatch(updateNotificationSetting(data));
                  }}
                  value={orderNoti}
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
                    name={strings("profile.save")}
                  />
                </View>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <PinkButton
                    onPress={() => {}}
                    style={styles.dbuttonStyle}
                    text={"small"}
                    name={strings("profile.cancel")}
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
    textAlign: "left",
  },
  title2: {
    ...commonFontStyle(500, 16, Colors.pink),
    marginBottom: hp(3),
    textAlign: "left",
  },
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
    textAlign: "left",
  },
  textInput: {
    ...commonFontStyle(400, 14, Colors.black),
    backgroundColor: Colors.white,
    marginBottom: hp(2),
    width: "100%",
    height: hp(12),
    padding: hp(2),
    borderRadius: 5,
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  buttonRow: {
    marginVertical: hp(3),
  },
});
