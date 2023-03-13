import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle, SCREEN_WIDTH } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import DriverItem from "../../Components/DeliveryComponent/DriverItem";
import RegistrationTextInput from "../../Components/RegistrationTextInput";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import PinkButton from "../../Components/PinkButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addDriver, getDrivers } from "../../Services/DeliveryApi";
import { useNavigation } from "@react-navigation/native";
import { media_url } from "../../Config/AppConfig";
import {
  dispatchErrorAction,
  validateEmail,
} from "../../Services/CommonFunctions";
import { driverTypeData } from "../../Config/StaticDropdownData";
import ImagePicker from "react-native-image-crop-picker";
import moment from "moment";

export default function D_DriversScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [firstname, setfirstname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [driverType, setDriverType] = useState("");
  const PRELOADER = useSelector((e) => e.merchant.preLoader);
  const companyProfile = useSelector((e) => e.delivery.companyProfile);
  const DRIVERS = useSelector((e) => e.delivery.drivers);
  const [image, setimage] = useState("");

  useEffect(() => {
    dispatch({ type: "PRE_LOADER_DELIVERY", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getDrivers());
    });
  }, []);
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
  const onAddDriver = () => {
    let data = {
      name: firstname,
      email: email,
      password: password,
      phone: phone,
      type: driverType,
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
    };
    dispatch(
      addDriver(data, () => {
        setfirstname("");
        setPhone("");
        setEmail("");
        setPassword("");
        setDriverType("");
        setimage("");
      })
    );
  };

  const validation = () => {
    if (firstname.trim() !== "") {
      if (phone.trim() !== "") {
        if (validateEmail(email)) {
          if (password.trim() !== "") {
            if (driverType !== "") {
              onAddDriver();
            } else {
              dispatchErrorAction(dispatch, "Please select driver type");
            }
          } else {
            dispatchErrorAction(dispatch, "Please enter password");
          }
        } else {
          dispatchErrorAction(dispatch, "Please enter valid email");
        }
      } else {
        dispatchErrorAction(dispatch, "Please enter phone number");
      }
    } else {
      dispatchErrorAction(dispatch, "Please enter firstname");
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
                companyProfile.image
                  ? { uri: media_url + companyProfile.image }
                  : require("../../Images/Merchant/xxxhdpi/profile_placeholder.png")
              }
            />
            <Text style={styles.name}>{companyProfile.name}</Text>
          </View>

          <View>
            {DRIVERS && DRIVERS.length !== 0 && (
              <View>
                <View>
                  <Text style={styles.title}>Driver Listing</Text>
                  <Text style={styles.title2}>Company List</Text>
                </View>
                <FlatList
                  contentContainerStyle={{ flex: 1 }}
                  data={DRIVERS}
                  style={{ flex: 1 }}
                  renderItem={({ item, index }) => {
                    return <DriverItem item={item} index={index} />;
                  }}
                  keyExtractor={(item) => item.id}
                />
              </View>
            )}
          </View>
          <View>
            <Text style={styles.title}>Driver Listing</Text>
            <Text style={styles.title2}>Add New Driver</Text>
          </View>
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
                  placeholder={"Phone Number"}
                  value={phone}
                  maxLength={12}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setPhone(text)}
                />
              </View>
            </View>
            <RegistrationTextInput
              placeholder={"Email"}
              value={email}
              onChangeText={(text) => setEmail(text)}
              // placeholderTextColor={Colors.black}
            />
            <RegistrationTextInput
              placeholder={"Password"}
              value={password}
              onChangeText={(text) => setPassword(text)}
              // placeholderTextColor={Colors.black}
            />

            <RegistrationDropdown
              data={driverTypeData}
              value={driverType}
              setData={(text) => {
                setDriverType(text);
              }}
              placeholder={"Driver Type"}
              valueField={"name"}
              style={styles.dropdownRow}
              placeholderTextColor={Colors.black}
            />
            <Text style={styles.title2}>Images</Text>
            <View>
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
                    <Text style={styles.attachText}>Choose File</Text>
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
            </View>

            <View style={styles.buttonRow}>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <PinkButton
                  onPress={() => validation()}
                  style={styles.dbuttonStyle}
                  text={"small"}
                  name={"Add Driver"}
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
  buttonRow: {
    marginVertical: hp(3),
    alignSelf: "center",
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
});
