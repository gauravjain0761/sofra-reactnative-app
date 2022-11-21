import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import { Dropdown } from "react-native-element-dropdown";
import PinkButton from "../../Components/PinkButton";

export default function M_StatisticsScreen() {
  const [tab, setTab] = useState("order");
  const [search, setSearch] = useState("");

  return (
    <View style={ApplicationStyles.mainView}>
      <Text style={styles.welcomeText}>Statistics</Text>
      <View style={styles.tabView}>
        <TouchableOpacity
          onPress={() => setTab("order")}
          style={tab == "order" ? styles.selectedTab : styles.tab}
        >
          <Text
            style={tab == "order" ? styles.selectedTabText : styles.tabText}
          >
            Orders Statistics
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab("earning")}
          style={tab == "earning" ? styles.selectedTab : styles.tab}
        >
          <Text
            style={tab == "earning" ? styles.selectedTabText : styles.tabText}
          >
            Earnings Statistics
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={styles.filterTitle}>Apply Date Filters</Text>
        {tab == "order" ? (
          <View>
            <View style={styles.searchBar2}>
              <TextInput
                placeholder="Search by Date Range"
                style={styles.searchInput2}
                value={search}
                onChangeText={(text) => setSearch(text)}
                placeholderTextColor={Colors.placeholderColor}
              />
              <TouchableOpacity style={styles.searchButton}>
                <Text style={styles.seatext}>Search</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.titles}>
              <Text style={styles.nameTitle}>ITEM</Text>
              <Text style={styles.nameTitle}>QUANTITY</Text>
            </View>
            <View style={styles.itemList}>
              <View style={styles.row}>
                <Text style={styles.rightText}>
                  Total Cash Orders (Completed)
                </Text>
                <Text style={styles.rightText}>0</Text>
              </View>
              <View style={styles.middleRow}>
                <Text style={styles.rightText}>
                  Total Online Orders (Completed)
                </Text>
                <Text style={styles.rightText}>0</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rightText}>Total Orders (Completed</Text>
                <Text style={styles.rightText}>0</Text>
              </View>
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.searchBar}>
              <Image
                source={require("../../Images/Merchant/xxxhdpi/ic_search.png")}
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Search by Date Range"
                style={styles.searchInput}
                value={search}
                onChangeText={(text) => setSearch(text)}
                placeholderTextColor={Colors.placeholderColor}
              />
              <Image
                source={require("../../Images/Merchant/xxxhdpi/ic_filter.png")}
                style={styles.searchIcon2}
              />
            </View>
            {[0, 1, 2, 3, 4, 5, 6].map((element, index) => {
              return (
                <View style={styles.itemList}>
                  <View style={styles.row}>
                    <Text style={styles.leftText}>Item</Text>
                    <Text style={styles.rightText}>Cash payments</Text>
                  </View>
                  <View style={styles.middleRow}>
                    <Text style={styles.leftText}>Amount(EXE VAT)</Text>
                    <Text style={styles.rightText}>AED 0.00</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.leftText}>VAT</Text>
                    <Text style={styles.rightText}>N/A</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  welcomeText: {
    ...commonFontStyle(400, 18, Colors.pink),
    marginTop: 5,
    // marginBottom: hp(3),
    textAlign: "center",
  },
  tabView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(3),
  },
  selectedTab: {
    flex: 1,
    paddingVertical: hp(2),
    backgroundColor: Colors.pink,
    alignItems: "center",
  },
  tab: {
    flex: 1,
    paddingVertical: hp(2),
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  selectedTabText: {
    ...commonFontStyle(400, 14, Colors.white),
  },
  tabText: {
    ...commonFontStyle(400, 14, Colors.darkGrey),
  },
  filterTitle: {
    ...commonFontStyle(500, 14, Colors.black),
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: hp(2),
    borderRadius: 8,
    marginVertical: hp(2.5),
  },
  searchBar2: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: hp(2),
    borderRadius: 8,
    marginVertical: hp(2.5),
    justifyContent: "space-between",
  },
  searchIcon: {
    height: hp(2.5),
    width: hp(2.5),
    resizeMode: "contain",
  },
  searchIcon2: {
    height: hp(3),
    width: hp(3),
    resizeMode: "contain",
  },
  searchInput: {
    height: hp(6),
    ...commonFontStyle(400, 14, Colors.black),
    paddingLeft: hp(2),
    width: "89%",
  },
  searchInput2: {
    height: hp(6),
    ...commonFontStyle(400, 14, Colors.black),
    // paddingLeft: hp(2),
    width: "78%",
  },
  itemList: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: hp(1.5),
  },
  row: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: hp(2.5),
    paddingHorizontal: hp(2.5),
  },
  middleRow: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: hp(2.5),
    paddingHorizontal: hp(2.5),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: Colors.backgroundScreen,
    borderBottomColor: Colors.backgroundScreen,
  },
  leftText: {
    ...commonFontStyle(500, 14, Colors.black),
  },
  rightText: {
    ...commonFontStyle(400, 14, Colors.grayButtonBackground),
  },
  searchButton: {
    backgroundColor: Colors.pink,
    paddingVertical: hp(1.5),
    paddingHorizontal: hp(1.5),
    borderRadius: 8,
  },
  seatext: {
    ...commonFontStyle(400, 14, Colors.white),
  },
  titles: {
    paddingHorizontal: hp(2.5),
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(2),
    marginTop: hp(1),
  },
  nameTitle: { ...commonFontStyle(500, 14, Colors.black) },
});
