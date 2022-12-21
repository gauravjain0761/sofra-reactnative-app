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
import { useDispatch, useSelector } from "react-redux";
import { getDashboardReports } from "../../Services/MerchantApi";
export default function M_DashboardScreen({ navigation }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const DASHBOARD_DATA = useSelector((e) => e.merchant.dashBoardData);
  useEffect(() => {
    dispatch({ type: "PRE_LOADER", payload: false });
    dispatch(getDashboardReports());
  }, []);

  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={ApplicationStyles.welcomeText}>Business Portal</Text>
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
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View style={styles.cardView}>
            <Text style={styles.cardTitle}>How it Works</Text>
            <Image
              style={styles.menuImage}
              source={require("../../Images/Merchant/xxxhdpi/menu_vector.png")}
            />
            <Text style={styles.addText}>Add your restaurant menu</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("M_MenuItemScreen")}
              style={styles.addMenuButton}
            >
              <Text style={styles.addButton}>Add Menu</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardView}>
            <Text style={styles.cardTitle}>How it Works</Text>
            <Image
              style={styles.menuImage}
              source={require("../../Images/Merchant/xxxhdpi/img_category.png")}
            />
            <Text style={styles.addText}>Add your category</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("M_MenuStack1")}
              style={styles.addMenuButton}
            >
              <Text style={styles.addButton}>Add Category</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.rowView}>
          <View style={styles.halfView}>
            <Text style={styles.halfViewTitle}>
              {DASHBOARD_DATA?.totalEarnings
                ? parseFloat(DASHBOARD_DATA?.totalEarnings).toFixed(2)
                : 0}
            </Text>
            <View style={styles.bottomcardRow}>
              <Image
                style={styles.bottomcardRowImage}
                source={require("../../Images/Merchant/xxxhdpi/ic_eraning.png")}
              />
              <Text style={styles.rightText}>Total{"\n"}Earning</Text>
            </View>
          </View>
          <View style={styles.halfView}>
            <Text style={styles.halfViewTitle}>
              {DASHBOARD_DATA?.bookingsCompleted
                ? DASHBOARD_DATA?.bookingsCompleted
                : 0}
            </Text>
            <View style={styles.bottomcardRow}>
              <Image
                style={styles.bottomcardRowImage}
                source={require("../../Images/Merchant/xxxhdpi/ic_complete_orders.png")}
              />
              <Text style={styles.rightText}>Completed{"\n"}Orders</Text>
            </View>
          </View>
        </View>
        <View style={styles.rowView}>
          <View style={styles.halfView}>
            <Text style={styles.halfViewTitle}>
              {DASHBOARD_DATA?.totalMenuItems
                ? DASHBOARD_DATA?.totalMenuItems
                : 0}
            </Text>
            <View style={styles.bottomcardRow}>
              <Image
                style={styles.bottomcardRowImage}
                source={require("../../Images/Merchant/xxxhdpi/ic_menu_dashboard.png")}
              />
              <Text style={styles.rightText}>Total{"\n"}Menu Items</Text>
            </View>
          </View>
          <View style={styles.halfView}>
            <Text style={styles.halfViewTitle}>
              {DASHBOARD_DATA?.bookingsActive
                ? DASHBOARD_DATA?.bookingsActive
                : 0}
            </Text>
            <View style={styles.bottomcardRow}>
              <Image
                style={styles.bottomcardRowImage}
                source={require("../../Images/Merchant/xxxhdpi/ic_active_order.png")}
              />
              <Text style={styles.rightText}>Active{"\n"}Orders</Text>
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
    marginRight: hp(2),
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
    marginTop: hp(2),
  },
  halfView: {
    backgroundColor: Colors.white,
    padding: hp(1.5),
    width: "48%",
    alignItems: "center",
    borderRadius: 8,
  },
  halfViewTitle: {
    ...commonFontStyle("M_600", 22, Colors.black),
    marginBottom: hp(1),
  },
  bottomcardRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  rightText: {
    ...commonFontStyle("M_600", 13, Colors.black),
    marginLeft: hp(1.5),
  },
  bottomcardRowImage: {
    height: hp(4.5),
    width: hp(4.5),
    resizeMode: "contain",
  },
});
