import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { useDispatch } from "react-redux";
export default function M_DashboardScreen({ navigation }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch({ type: "PRE_LOADER", payload: false });
  }, []);

  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={ApplicationStyles.welcomeText}>Delivery Portal</Text>
        <View style={styles.searchBar}>
          <Image
            source={require("../../Images/Merchant/xxxhdpi/ic_search.png")}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search for specific"
            style={styles.searchInput}
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholderTextColor={Colors.placeholderColor}
          />
        </View>

        <View style={styles.cardView}>
          <Text style={styles.cardTitle}>Add New Driver</Text>
          <Image
            style={styles.menuImage}
            source={require("../../Images/Delivery/xxxhdpi/ic_driver_selected.png")}
          />
          <TouchableOpacity style={styles.addMenuButton}>
            <Text style={styles.addButton}>Add Driver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowView}>
          <View style={styles.halfView}>
            <Text style={styles.halfViewTitle}>0.00</Text>
            <View style={styles.bottomcardRow}>
              <Image
                style={styles.bottomcardRowImage}
                source={require("../../Images/Delivery/xxxhdpi/ic_earning.png")}
              />
              <Text style={styles.rightText}>Total{"\n"}Earning</Text>
            </View>
          </View>
          <View style={styles.halfView}>
            <Text style={styles.halfViewTitle}>250</Text>
            <View style={styles.bottomcardRow}>
              <Image
                style={styles.bottomcardRowImage}
                source={require("../../Images/Delivery/xxxhdpi/ic_fee.png")}
              />
              <Text style={styles.rightText}>Convenience{"\n"}Fee Charged</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: hp(2),
    borderRadius: 8,
    marginBottom: hp(3),
  },
  searchIcon: {
    height: hp(2),
    width: hp(2),
    resizeMode: "contain",
  },
  searchInput: {
    height: hp(6),
    ...commonFontStyle(400, 16, Colors.black),
    paddingLeft: hp(2),
    width: "100%",
  },
  cardView: {
    borderRadius: 8,
    backgroundColor: Colors.white,
    padding: hp(3),
    alignItems: "center",
    // marginRight: hp(2),
  },
  cardTitle: {
    ...commonFontStyle("extraBold", 24, Colors.black),
    paddingHorizontal: hp(3),
  },
  addText: {
    ...commonFontStyle(400, 13, Colors.black),
  },
  addButton: {
    ...commonFontStyle("M_700", 14, Colors.white),
  },
  addMenuButton: {
    paddingHorizontal: hp(3),
    paddingVertical: hp(1.5),
    backgroundColor: Colors.pink,
    marginTop: hp(2),
    borderRadius: 5,
  },
  menuImage: {
    marginVertical: hp(3),
    height: hp(12),
    width: hp(20),
    resizeMode: "contain",
  },
  rowView: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: hp(2),
  },
  halfView: {
    backgroundColor: Colors.white,
    padding: hp(1.5),
    width: "48%",
    alignItems: "center",
    borderRadius: 8,
  },
  halfViewTitle: {
    ...commonFontStyle("M_600", 24, Colors.black),
    marginBottom: hp(1.5),
  },
  bottomcardRow: {
    flexDirection: "row",
    // justifyContent: 'space-between',
    alignItems: "center",
    width: "100%",
  },
  rightText: {
    ...commonFontStyle("M_600", 14, Colors.black),
    marginLeft: hp(1.5),
  },
  bottomcardRowImage: {
    height: hp(5),
    width: hp(5),
    resizeMode: "contain",
  },
});
