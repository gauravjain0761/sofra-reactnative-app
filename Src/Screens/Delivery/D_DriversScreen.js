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
import { getDrivers } from "../../Services/DeliveryApi";
import { useNavigation } from "@react-navigation/native";
import { media_url } from "../../Config/AppConfig";

export default function D_DriversScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [driversList, setDriversList] = useState([1, 2, 3, 4, 5]);
  const [firstname, setfirstname] = useState("Jasica");
  const [lastname, setlastname] = useState("Birnilvis");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [driverType, setDriverType] = useState("");
  const PRELOADER = useSelector((e) => e.merchant.preLoader);
  const companyProfile = useSelector((e) => e.delivery.companyProfile);
  const DRIVERS = useSelector((e) => e.delivery.drivers);
  useEffect(() => {
    dispatch({ type: "PRE_LOADER_DELIVERY", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getDrivers());
    });
  }, []);

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
            <Text style={styles.title2}>Add Driver</Text>
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
                  placeholder={"Lastname"}
                  value={lastname}
                  onChangeText={(text) => setlastname(text)}
                />
              </View>
            </View>
            <RegistrationTextInput
              placeholder={"Email"}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={Colors.black}
            />
            <RegistrationTextInput
              placeholder={"Password"}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={Colors.black}
            />
            <RegistrationTextInput
              placeholder={"Driver Type"}
              value={driverType}
              onChangeText={(text) => setDriverType(text)}
              placeholderTextColor={Colors.black}
            />

            <Text style={styles.title2}>Images</Text>
            <View>
              <RegistrationDropdown
                // data={citydata}
                // value={b_category}
                // setData={(text) => {
                //   setb_category(text);
                // }}
                placeholder={"Choose File"}
                valueField={"strategicName"}
                style={styles.dropdownRow}
                placeholderTextColor={Colors.black}
              />
            </View>

            <View style={styles.buttonRow}>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <PinkButton
                  onPress={() => {}}
                  style={styles.dbuttonStyle}
                  text={"small"}
                  name={"Add Drivers"}
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
});
