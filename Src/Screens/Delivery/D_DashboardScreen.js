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
import { getDeliveryDashboardReports } from "../../Services/DeliveryApi";
export default function M_DashboardScreen({ navigation }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const DASHBOARD_DATA = useSelector((e) => e.delivery.dashboardData);
  useEffect(() => {
    dispatch({ type: "PRE_LOADER_DELIVERY", payload: false });
    dispatch({ type: "PRE_LOADER", payload: false });
    dispatch(getDeliveryDashboardReports());
  }, []);
  return (
    <View style={ApplicationStyles.mainViewWithoutPadding}>
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
            source={require("../../Images/Delivery/xxxhdpi/ic_delivery.png")}
          />
          <TouchableOpacity
            style={styles.addMenuButton}
            onPress={() => {
              // D_DeliveredOrderScreen
              // D_CancelledOrderScreen
              // navigation.navigate('D_AddNewDriver')
              // navigation.navigate('D_CancelledOrderScreen')
              navigation.navigate("D_PickUpOrderScreen");
              // navigation.navigate('D_ActiveOrderScreen')
            }}
          >
            <Text style={styles.addButton}>Add Driver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowView}>
          <View style={styles.halfView}>
            <Text style={styles.halfViewTitle}>
              {DASHBOARD_DATA ? DASHBOARD_DATA.totalEarnings : 0}
            </Text>
            <View style={styles.bottomcardRow}>
              <Image
                style={styles.bottomcardRowImage}
                source={require("../../Images/Delivery/xxxhdpi/ic_earning.png")}
              />
              <Text style={styles.rightText}>Total{"\n"}Earning</Text>
            </View>
          </View>
          <View style={styles.halfView}>
            <Text style={styles.halfViewTitle}>
              {DASHBOARD_DATA ? DASHBOARD_DATA.totalConvienceFee : 0}
            </Text>
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
    marginHorizontal: hp(2),
  },
  paddingView: {
    marginHorizontal: hp(2),
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
    marginBottom: hp(2),
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
    marginVertical: hp(1),
    height: hp(18),
    width: hp(30),
    resizeMode: "contain",
  },
  rowView: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
    marginHorizontal: hp(2),
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
