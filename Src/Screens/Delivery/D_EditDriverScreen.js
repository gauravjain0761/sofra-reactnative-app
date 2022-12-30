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
import {
  addDriver,
  getDrivers,
  updateDriver,
} from "../../Services/DeliveryApi";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { media_url } from "../../Config/AppConfig";
import {
  dispatchErrorAction,
  validateEmail,
} from "../../Services/CommonFunctions";
import { driverTypeData } from "../../Config/StaticDropdownData";
import ImagePicker from "react-native-image-crop-picker";
import moment from "moment";

export default function D_EditDriverScreen(props) {
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
  const [DriverIdEdit, setDriverIdEdit] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    let driverItem = props?.route?.params;
    if (driverItem) {
      setfirstname(driverItem.name ? driverItem.name : "");
      setPhone(driverItem.phone ? driverItem.phone : "");
      setEmail(driverItem.email ? driverItem.email : "");
      setDriverType(driverItem.type ? driverItem.type : "");
      setimage(driverItem.picture ? driverItem.picture : "");
      setDriverIdEdit(driverItem.id);
    }
  }, [props, isFocused]);

  const openPicker = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      includeBase64: true,
    }).then((photo) => {
      setimage(photo);
    });
  };
  const onAddDriver = () => {
    let data = {
      driverId: DriverIdEdit,
      name: firstname,
      email: email,
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
    dispatch(updateDriver(data, navigation));
  };

  const validation = () => {
    if (firstname.trim() !== "") {
      if (phone.trim() !== "") {
        if (validateEmail(email)) {
          if (driverType !== "") {
            onAddDriver();
          } else {
            dispatchErrorAction(dispatch, "Please select driver type");
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
    <View style={ApplicationStyles.mainView}>
      <Text style={ApplicationStyles.welcomeText}>Edit Driver</Text>
      <ScrollView>
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
            <View style={{ width: SCREEN_WIDTH - hp(2) }}>
              <PinkButton
                onPress={() => validation()}
                style={styles.dbuttonStyle}
                text={"small"}
                name={"Edit Driver"}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
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
