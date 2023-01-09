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
import { commonFontStyle, SCREEN_WIDTH } from "../../Themes/Fonts";
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
import SearchDropdown from "../../Components/SearchDropdown";
import { dateFilterData } from "../../Config/StaticDropdownData";
import DateTimePickerView from "../../Components/DateTimePickerView";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { dispatchErrorAction } from "../../Services/CommonFunctions";

export default function M_ReportScreen({ navigation }) {
  const [tab, setTab] = useState("report");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [reportType, setreportType] = useState(reportDropdownData[0].name);
  const setteled_report = useSelector((e) => e.merchant.setteled_report);
  const unsetteled_report = useSelector((e) => e.merchant.unsetteled_report);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateType, setdateType] = useState([]);
  const REPORT =
    Object.keys(setteled_report).length == 0
      ? unsetteled_report
      : setteled_report;
  useEffect(() => {
    dispatch({ type: "PRE_LOADER", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getSettledReports());
      setSearch("");
      setStartDate("");
      setEndDate("");
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
            <Text style={styles.rightText}>
              AED {REPORT.totalResturantSale}
            </Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.rightText}>
              Total Sofra Charges(VAT Inclusive)
            </Text>
            <Text style={styles.rightText}>
              -AED {REPORT.totalSofraCharges}
            </Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.rightText}>Net settlement Amount</Text>
            <Text style={styles.rightText}>
              AED {REPORT.netSettlementAmount}
            </Text>
          </View>
          {reportType == reportDropdownData[0].name && (
            <View>
              <View style={styles.row2}>
                <Text style={styles.rightText}>Settlement Period</Text>
                <Text style={styles.rightText}>
                  {moment(
                    REPORT.settlementPeriodStart
                      ? REPORT.settlementPeriodStart
                      : undefined
                  ).format("DD MMM YYYY")}{" "}
                  to{" "}
                  {moment(
                    REPORT.settlementPeriodEnd
                      ? REPORT.settlementPeriodEnd
                      : undefined
                  ).format("DD MMM YYYY")}
                </Text>
              </View>
              <View style={styles.row2}>
                <Text style={styles.rightText}>Settlement Date</Text>
                <Text style={styles.rightText}>
                  {REPORT.settlementPeriodStart
                    ? moment(REPORT.settlementPeriodStart).format("DD MMM YYYY")
                    : "N/A"}
                </Text>
              </View>
              <View style={styles.row2}>
                <Text style={styles.rightText}>Settlement Reference</Text>
                <Text style={styles.rightText}>
                  {REPORT.settlementReference}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  const getReportsData = (text, data) => {
    setreportType(text);
    setTab("report");
    if (text == reportDropdownData[0].name) {
      dispatch({ type: "PRE_LOADER", payload: true });
      dispatch(getSettledReports(data));
    } else {
      dispatch({ type: "PRE_LOADER", payload: true });
      dispatch(getUnSettledReports(data));
    }
  };

  const handleConfirm = (date) => {
    if (dateType == "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    setDatePickerVisibility(false);
  };

  const onSearchDateWise = () => {
    if (search == "CUSTOM") {
      if (StartDate !== "") {
        if (EndDate !== "") {
          getFilterData(
            moment(StartDate).format("YYYY-MM-DD"),
            moment(EndDate).format("YYYY-MM-DD")
          );
        } else dispatchErrorAction(dispatch, "Please select end date");
      } else dispatchErrorAction(dispatch, "Please select start date");
    } else {
      if (search !== "") {
        const selectedDate = dateFilterData.filter((obj) => obj.name == search);
        getFilterData(selectedDate[0].startDate, selectedDate[0].endDate);
      }
    }
  };
  const getFilterData = (sDate, eDate) => {
    let data = { startDate: sDate, endDate: eDate };
    getReportsData(reportType, data);
  };
  return (
    <View style={ApplicationStyles.mainView}>
      <Text style={ApplicationStyles.welcomeText}>{reportType}</Text>
      <RegistrationDropdown
        data={reportDropdownData}
        value={reportType}
        setData={(text) => {
          {
            getReportsData(text), setSearch("");
          }
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
        <SearchDropdown
          value={search}
          setData={(text) => {
            setSearch(text);
          }}
          placeholder={"Search by Date Range"}
          valueField={"name"}
          labelField={"label"}
          style={styles.dropdownRow}
          placeholderTextColor={Colors.placeholderColor}
          onSearch={() => onSearchDateWise()}
        />
        {search == "CUSTOM" && (
          <View style={styles.datesRow}>
            <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
              <DateTimePickerView
                value={StartDate}
                format={"MM/DD/YYYY"}
                placeHolder={"Start date"}
                onPressPicker={() => {
                  setDatePickerVisibility(true), setdateType("start");
                }}
                width={"100%"}
              />
            </View>
            <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
              <DateTimePickerView
                value={EndDate}
                format={"MM/DD/YYYY"}
                placeHolder={"End date"}
                onPressPicker={() => {
                  setDatePickerVisibility(true), setdateType("end");
                }}
                width={"100%"}
              />
            </View>
          </View>
        )}

        {tab == "order" && <OrderComponent />}
        {tab == "report" && <ReportSettled reportType={reportType} />}
        {tab == "summary" && <SummaryComponent />}
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
        minimumDate={dateType == "end" ? StartDate : null}
      />
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
  datesRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
});
