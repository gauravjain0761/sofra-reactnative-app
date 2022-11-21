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

  const openPicker = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      includeBase64: true,
    }).then((photo) => {
      console.log(photo);
      setImageItem(photo);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={ApplicationStyles.mainView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Image
              style={styles.drawerImage}
              source={require("../../Images/Merchant/xxxhdpi/bg_profile.png")}
            />
            <Text style={styles.name}>Jasica Birnilvis</Text>
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
                data={citydata}
                value={b_category}
                setData={(text) => {
                  setb_category(text);
                }}
                placeholder={"Business Categories"}
                valueField={"strategicName"}
                style={styles.dropdownRow}
                placeholderTextColor={Colors.black}
              />
              <View style={styles.row}>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationDropdown
                    data={citydata}
                    value={VATtype}
                    setData={(text) => {
                      setVATtype(text);
                    }}
                    placeholder={"VAT Type"}
                    valueField={"strategicName"}
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
                    data={citydata}
                    value={city}
                    setData={(text) => {
                      setcity(text);
                    }}
                    placeholder={"City"}
                    valueField={"strategicName"}
                    style={styles.dropdownRow}
                    placeholderTextColor={Colors.black}
                  />
                </View>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationDropdown
                    data={citydata}
                    value={cuisine}
                    setData={(text) => {
                      setcuisine(text);
                    }}
                    placeholder={"Cuisine"}
                    valueField={"strategicName"}
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
                        uri: `data:image/jpeg;base64,${ImageItem.data}`,
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
              <RegistrationDropdown
                data={citydata}
                value={location}
                setData={(text) => {
                  location(text);
                }}
                placeholder={"Locations"}
                valueField={"strategicName"}
                style={styles.dropdownRow}
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
                    onPress={() => {}}
                    style={styles.dbuttonStyle}
                    text={"small"}
                    name={"Saver"}
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
    ...commonFontStyle(600, 18, Colors.black),
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
