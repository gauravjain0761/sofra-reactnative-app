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
import MapView from 'react-native-maps';

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
export default function D_ProfileScreen({ navigation }) {
  const [firstname, setfirstname] = useState("Jasica");
  const [lastname, setlastname] = useState("Birnilvis");
  const [phoneNumber, setphoneNumber] = useState("");
  const [businessName, setbusinessName] = useState("");
  const [b_category, setb_category] = useState("");
  const [deliveryTime, setdeliveryTime] = useState("");
  const [image, setimage] = useState("");

  const openPicker = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      includeBase64: true,
    }).then((photo) => {
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
            <Text style={styles.name}>Food Panda</Text>
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
                    placeholderTextColor={Colors.black}
                  />
                </View>
                <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                  <RegistrationTextInput
                    keyboardType={"numeric"}
                    placeholder={"Phone"}
                    value={phoneNumber}
                    onChangeText={(text) => setphoneNumber(text)}
                    placeholderTextColor={Colors.black}
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
                  <Text style={styles.attachText}>Attach Logo Images</Text>
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

            <View style={styles.row}>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <RegistrationTextInput
                  placeholder={"Licence No"}
                  value={businessName}
                  onChangeText={(text) => setbusinessName(text)}
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
                  placeholder={"City"}
                  valueField={"strategicName"}
                  style={styles.dropdownRow}
                  placeholderTextColor={Colors.black}
                />
              </View>
            </View>

            <View>
              <RegistrationDropdown
                data={citydata}
                value={b_category}
                setData={(text) => {
                  setb_category(text);
                }}
                placeholder={"Location"}
                valueField={"strategicName"}
                style={styles.dropdownRow}
                placeholderTextColor={Colors.black}
              />
            </View>
            <Text style={styles.title2}>Set map location</Text>
            {/* <MapView
              region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            // onRegionChange={this.onRegionChange}
            /> */}
            <Text style={styles.title2}>Upload Files/Documents</Text>
            <TouchableOpacity
              onPress={() => openPicker()}
              style={styles.docView}
            >
              {image == "" ? (
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
                  <Image
                    source={{
                      uri: `data:image/jpeg;base64,${ImageItem.data}`,
                    }}
                    style={styles.image}
                  />
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.buttonRow}>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <PinkButton
                  onPress={() => { }}
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
    paddingVertical: hp(2)
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
    alignSelf: 'center'
  },
});
