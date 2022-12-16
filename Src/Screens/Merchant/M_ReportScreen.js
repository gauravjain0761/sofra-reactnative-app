import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import { Dropdown } from "react-native-element-dropdown";
import PinkButton from "../../Components/PinkButton";
import ReportSettled from "../../Components/ReportSettled";
import { useDispatch, useSelector } from "react-redux";
import {
  getSettledReports,
  getUnSettledReports,
} from "../../Services/MerchantApi";
import { reportDropdownData } from "../../Config/StaticDropdownData";

export default function M_ReportScreen({ navigation }) {
  const [tab, setTab] = useState("report");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [reportType, setreportType] = useState(reportDropdownData[0].name);
  const setteled_report = useSelector((e) => e.merchant.setteled_report);
  const unsetteled_report = useSelector((e) => e.merchant.unsetteled_report);

  const REPORT =
    Object.keys(setteled_report).length == 0
      ? unsetteled_report
      : setteled_report;
  useEffect(() => {
    dispatch({ type: "PRE_LOADER", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getSettledReports());
    });
  }, []);
  const OrderComponent = () => {
    return (
      <View>
        <Text style={styles.tabTitle2}>Order Details</Text>
        <View style={styles.titles}>
          <Text style={styles.nameTitle}>TOTAL CASH ORDERS(COMPLETED)</Text>
          <Text style={styles.nameTitle}>QUANTITY</Text>
        </View>
        <View style={styles.itemList}>
          <View style={styles.row}>
            <Text style={styles.rightText}>Total Cash Orders (Completed)</Text>
            <Text style={styles.rightText}>{REPORT.cashOrders}</Text>
          </View>
          <View style={styles.middleRow}>
            <Text style={styles.rightText}>
              Total Online Orders (Completed)
            </Text>
            <Text style={styles.rightText}>{REPORT.onlineOrders}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rightText}>Total Orders (Completed)</Text>
            <Text style={styles.rightText}>
              {REPORT.cashOrders + REPORT.onlineOrders}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const SummaryComponent = () => {
    return (
      <View>
        {/* <Text style={styles.tabTitle2}>Order Details</Text> */}
        <View style={styles.titles}>
          <Text style={styles.nameTitle}>SUMMARY</Text>
          <Text style={styles.nameTitle}>SUMMARY</Text>
        </View>
        <View style={styles.itemList}>
          <View style={styles.row2}>
            <Text style={styles.rightText}>Total Restaurant Sale(Vat Inc)</Text>
            <Text style={styles.rightText}>AED 0.00</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.rightText}>
              Total Sofra Charges(VAT Inclusive)
            </Text>
            <Text style={styles.rightText}>-AED 0.00</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.rightText}>Net settlement Amount</Text>
            <Text style={styles.rightText}>AED 0.00</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.rightText}>Net settlement Amount</Text>
            <Text style={styles.rightText}>AED 0.00</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.rightText}>Settlement Period</Text>
            <Text style={styles.rightText}>01 Jan 1970 to 01 Jan 1970</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.rightText}>Settlement Date</Text>
            <Text style={styles.rightText}>01 Jan 1970</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.rightText}>Settlement Reference</Text>
            <Text style={styles.rightText}></Text>
          </View>
        </View>
      </View>
    );
  };

  const getReportsData = (text) => {
    setreportType(text);
    setTab("report");
    if (text == reportDropdownData[0].name) {
      dispatch({ type: "PRE_LOADER", payload: true });
      dispatch(getSettledReports());
    } else {
      dispatch({ type: "PRE_LOADER", payload: true });
      dispatch(getUnSettledReports());
    }
  };
  return (
    <View style={ApplicationStyles.mainView}>
      <Text style={ApplicationStyles.welcomeText}>{reportType}</Text>
      <RegistrationDropdown
        data={reportDropdownData}
        value={reportType}
        setData={(text) => {
          getReportsData(text);
        }}
        placeholder={reportType}
        valueField={"name"}
        style={styles.dropdownRow}
        placeholderTextColor={Colors.black}
      />
      <View style={styles.tabView}>
        {/* <TouchableOpacity
          onPress={() => setTab("report")}
          style={tab == "report" ? styles.selectedTab : styles.tab}
        >
          <Text
            style={tab == "report" ? styles.selectedTabText : styles.tabText}
          >
            Reports-Settled
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => setTab("order")}
          style={tab == "order" ? styles.selectedTab : styles.tab}
        >
          <Text
            style={tab == "order" ? styles.selectedTabText : styles.tabText}
          >
            Order Details
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab("summary")}
          style={tab == "summary" ? styles.selectedTab : styles.tab}
        >
          <Text
            style={tab == "summary" ? styles.selectedTabText : styles.tabText}
          >
            Summary
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.filterTitle}>Apply Date Filters</Text>
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

        {tab == "order" && <OrderComponent />}
        {tab == "report" && <ReportSettled reportType={reportType} />}
        {tab == "summary" && <SummaryComponent />}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  tabView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(3),
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
    ...commonFontStyle(400, 13.5, Colors.white),
  },
  tabText: {
    ...commonFontStyle(400, 13.5, Colors.darkGrey),
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
    width: "85%",
  },

  tabTitle2: {
    ...commonFontStyle(500, 16, Colors.black),
    marginBottom: hp(2.5),
  },
  titles: {
    paddingHorizontal: hp(1.5),
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(2),
    marginTop: hp(1),
  },
  nameTitle: { ...commonFontStyle(400, 13, Colors.black) },
  row: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: hp(1.8),
    paddingHorizontal: hp(2),
  },
  row2: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: hp(1.8),
    paddingHorizontal: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundScreen,
  },
  itemList: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: hp(1.5),
  },
  middleRow: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: hp(1.8),
    paddingHorizontal: hp(2),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: Colors.backgroundScreen,
    borderBottomColor: Colors.backgroundScreen,
  },
  leftText: {
    ...commonFontStyle(500, 13, Colors.black),
  },
  rightText: {
    ...commonFontStyle(400, 13, Colors.grayButtonBackground),
  },
});
