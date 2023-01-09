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
import React, { useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle, SCREEN_WIDTH } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import RegistrationTextInput from "../../Components/RegistrationTextInput";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import ImagePicker from "react-native-image-crop-picker";
import PinkButton from "../../Components/PinkButton";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import DocumentPicker from "react-native-document-picker";

import {
  getCompanyProfile,
  updateProfileCompany,
} from "../../Services/DeliveryApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { media_url } from "../../Config/AppConfig";
import { dispatchErrorAction } from "../../Services/CommonFunctions";

export default function D_ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [businessName, setbusinessName] = useState("");
  const [licenceNo, setlicenceNo] = useState("");
  const [location, setlocation] = useState("");
  const [image, setimage] = useState("");
  const [city, setcity] = useState("");
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");
  const COMPANY = useSelector((e) => e.delivery.companyProfile);
  const CITIES = useSelector((e) => e.merchant.cities);
  const [document, setdocument] = useState("");

  const openPicker = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      includeBase64: true,
    }).then((photo) => {
      setimage(photo);
    });
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(getCompanyProfile());
    });
  }, []);

  const openDocumentPicker = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: "fullScreen",
      });
      setdocument(response[0]);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (COMPANY !== {} && Object.keys(COMPANY).length !== 0) {
      let city = CITIES.filter((obj) => obj.id == Number(COMPANY.cityId));
      setfirstname(COMPANY.first_name);
      setlastname(COMPANY.last_name);
      setbusinessName(COMPANY.name);
      setphoneNumber(COMPANY.phone);
      setimage(COMPANY.image ? COMPANY.image : "");
      setlicenceNo(COMPANY.licenseNo);
      setcity(city[0].name);
      setlocation(COMPANY.location);
      setlat(COMPANY.lat ? Number(COMPANY.lat) : "");
      setlong(COMPANY.lng ? Number(COMPANY.lng) : "");
    }
  }, [COMPANY]);

  const onUpdateProfile = () => {
    let cityName = CITIES.filter((obj) => obj.name == city);
    let data = {
      first_name: firstname,
      last_name: lastname,
      name: businessName,
      phone: phoneNumber,
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
      cityId: cityName[0].id,
      location: location,
      lat: String(lat),
      lng: String(long),
      licenseNo: licenceNo,
      email: COMPANY.email,
      currentlyDeliver: COMPANY.currentlyDeliver,
      social_account: COMPANY.social_account,
      onboardLanguage: COMPANY.onboardLanguage,
      "files[0]":
        document !== "" && document.uri
          ? {
              uri: document.uri,
              type: document.type, // or photo.type image/jpg
              name: moment().unix() + "_" + document.name,
            }
          : undefined,
    };

    dispatch(updateProfileCompany(data));
  };

  const validation = () => {
    if (firstname.trim() !== "") {
      if (businessName.trim() !== "") {
        if (phoneNumber.trim() !== "") {
          if (licenceNo.trim() !== "") {
            if (city.trim() !== "") {
              if (location.trim() !== "") {
                onUpdateProfile();
              } else {
                dispatchErrorAction(dispatch, "Please enter location.");
              }
            } else {
              dispatchErrorAction(dispatch, "Please select city.");
            }
          } else {
            dispatchErrorAction(dispatch, "Please enter licence number.");
          }
        } else {
          dispatchErrorAction(dispatch, "Please enter phone number.");
        }
      } else {
        dispatchErrorAction(dispatch, "Please enter company name.");
      }
    } else {
      dispatchErrorAction(dispatch, "Please enter firstname.");
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
                COMPANY?.image
                  ? { uri: media_url + COMPANY?.image }
                  : require("../../Images/Merchant/xxxhdpi/profile_placeholder.png")
              }
            />
            <Text style={styles.name}>{COMPANY.name}</Text>
          </View>
          <View>
            <Text style={styles.title}>Update Profile</Text>
            <Text style={styles.title2}>Company Details:</Text>
            <View>
              <View style={styles.row}>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationTextInput
                    placeholder={"Firstname"}
                    value={firstname}
                    onChangeText={(text) => setfirstname(text)}
                  />
                </View>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationTextInput
                    placeholder={"Lastname"}
                    value={lastname}
                    onChangeText={(text) => setlastname(text)}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationTextInput
                    placeholder={"Company Name"}
                    value={businessName}
                    onChangeText={(text) => setbusinessName(text)}
                  />
                </View>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationTextInput
                    keyboardType={"numeric"}
                    placeholder={"Phone"}
                    value={phoneNumber}
                    onChangeText={(text) => setphoneNumber(text)}
                  />
                </View>
              </View>
            </View>
            <Text style={styles.title2}>Image</Text>
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
                  <Text style={styles.attachText}>Attach Logo Image</Text>
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

            <View style={styles.row}>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <RegistrationTextInput
                  placeholder={"Licence No"}
                  value={licenceNo}
                  onChangeText={(text) => setlicenceNo(text)}
                />
              </View>
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
                />
              </View>
            </View>

            <View>
              {/* <RegistrationDropdown
                data={citydata}
                value={b_category}
                setData={(text) => {
                  setb_category(text);
                }}
                placeholder={"Location"}
                valueField={"strategicName"}
                style={styles.dropdownRow}
              /> */}
              <RegistrationTextInput
                placeholder={"Locations"}
                value={location}
                onChangeText={(text) => setlocation(text)}
              />
            </View>
            {lat !== "" && long !== "" && (
              <View>
                <Text style={styles.title2}>Set map location</Text>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  region={{
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                  }}
                  style={{ height: 200, marginBottom: hp(3) }}
                  // onRegionChange={this.onRegionChange}
                >
                  <Marker
                    coordinate={{ latitude: lat, longitude: long }}
                    // image={{uri: 'custom_pin'}}
                  />
                </MapView>
              </View>
            )}

            <Text style={styles.title2}>Upload Files/Documents</Text>
            <TouchableOpacity
              onPress={() => openDocumentPicker()}
              style={styles.docView}
            >
              {document == "" ? (
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.docText}>Upload Files Here</Text>
                  <Image
                    source={require("../../Images/Merchant/xxxhdpi/ic_doc.png")}
                    style={styles.imageVector}
                  />
                  <Text style={styles.attachText}>Choose file here...</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.uploadTextTitle}>{document.name}</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.buttonRow}>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <PinkButton
                  onPress={() => validation()}
                  style={styles.dbuttonStyle}
                  text={"small"}
                  name={"Update Profile"}
                />
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
    // backgroundColor: Colors.white,
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
  docView: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: hp(24),
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
  docText: {
    ...commonFontStyle(700, 14, Colors.black),
    // marginTop: hp(1),
    paddingVertical: hp(2),
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
    alignSelf: "center",
  },
  uploadTextTitle: {
    ...commonFontStyle("M_700", 18, Colors.black),
    marginBottom: hp(1.5),
  },
});
