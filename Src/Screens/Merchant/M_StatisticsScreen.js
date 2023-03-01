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
import { useDispatch, useSelector } from "react-redux";
import { getStatitics } from "../../Services/MerchantApi";
import SearchDropdown from "../../Components/SearchDropdown";
import { dateFilterData } from "../../Config/StaticDropdownData";
import DateTimePickerView from "../../Components/DateTimePickerView";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { dispatchErrorAction } from "../../Services/CommonFunctions";
import {strings} from '../../Config/I18n';

export default function M_StatisticsScreen({ navigation }) {
  const dispatch = useDispatch();
  const STATISTICS = useSelector((e) => e.merchant.statistics);
  const [tab, setTab] = useState("order");
  const [search, setSearch] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [Users, setUsers] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateType, setdateType] = useState([]);

  useEffect(() => {
    dispatch({ type: "PRE_LOADER", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getStatitics());
      setSearch("");
      setStartDate("");
      setEndDate("");
    });
  }, []);
  const handleConfirm = (date) => {
    if (dateType == "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    setDatePickerVisibility(false);
  };
  const CommonEarningItems = ({ name, amount, vat }) => {
    return (
      <View style={styles.itemList}>
        <View style={styles.row}>
          <Text style={styles.leftText}>Item</Text>
          <Text style={styles.rightText}>{name}</Text>
        </View>
        <View style={styles.middleRow}>
          <Text style={styles.leftText}>Amount(EXE VAT)</Text>
          <Text style={styles.rightText}>{amount}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftText}>VAT</Text>
          <Text style={styles.rightText}>{vat}</Text>
        </View>
      </View>
    );
  };
  const onSearchDateWise = () => {
    if (search == "CUSTOM") {
      if (StartDate !== "") {
        if (EndDate !== "") {
          getFilterData(
            moment(StartDate).format("YYYY-MM-DD"),
            moment(EndDate).format("YYYY-MM-DD")
          );
        } else dispatchErrorAction(dispatch, strings('validationString.please_select_end_date'));
      } else dispatchErrorAction(dispatch, strings('validationString.please_select_start_date'));
    } else {
      if (search !== "") {
        const selectedDate = dateFilterData.filter((obj) => obj.name == search);
        getFilterData(selectedDate[0].startDate, selectedDate[0].endDate);
      }
    }
  };
  const getFilterData = (sDate, eDate) => {
    let data = { startDate: sDate, endDate: eDate };
    dispatch(getStatitics(data));
  };
  return (
    <View style={ApplicationStyles.mainView}>
      <Text style={ApplicationStyles.welcomeText}>{strings('statisticsScreen.statistics')}</Text>
      <View style={styles.tabView}>
        <TouchableOpacity
          onPress={() => setTab("order")}
          style={tab == "order" ? styles.selectedTab : styles.tab}
        >
          <Text
            style={tab == "order" ? styles.selectedTabText : styles.tabText}
          >
           {strings('statisticsScreen.orders_statistics')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab("earning")}
          style={tab == "earning" ? styles.selectedTab : styles.tab}
        >
          <Text
            style={tab == "earning" ? styles.selectedTabText : styles.tabText}
          >
            {strings('statisticsScreen.earnings_statistics')}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.filterTitle}>{strings('statisticsScreen.apply_date_filters')}</Text>
        <SearchDropdown
          value={search}
          setData={(text) => {
            setSearch(text);
          }}
          placeholder={strings('statisticsScreen.search_by_date_range')}
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
        {tab == "order" ? (
          <View>
            <View style={styles.titles}>
              <Text style={styles.nameTitle}>{strings('statisticsScreen.item')}</Text>
              <Text style={styles.nameTitle}>{strings('statisticsScreen.quantity')}</Text>
            </View>
            <View style={styles.itemList}>
              <View style={styles.row}>
                <Text style={styles.rightText}>
                 {strings('statisticsScreen.total_cash_orders')}
                </Text>
                <Text style={styles.rightText}>
                  {STATISTICS.cashOrdersCount}
                </Text>
              </View>
              <View style={styles.middleRow}>
                <Text style={styles.rightText}>
                {strings('statisticsScreen.total_online_orders')}
                </Text>
                <Text style={styles.rightText}>
                  {STATISTICS.onlineOrdersCount}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rightText}>{strings('statisticsScreen.total_orders')}</Text>
                <Text style={styles.rightText}>
                  {STATISTICS.cashOrdersCount + STATISTICS.onlineOrdersCount}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View>
            {STATISTICS && (
              <View>
                <CommonEarningItems
                  name={strings('statisticsScreen.cash_payments')}
                  amount={STATISTICS.totalCASHEarnings}
                  vat={STATISTICS.cashBookingVat}
                />
                <CommonEarningItems
                  name={strings('statisticsScreen.lateralEntry.credit_card_payments')}
                  amount={STATISTICS.totalCARDEarnings}
                  vat={STATISTICS.CARDBookingVat}
                />
                <CommonEarningItems
                  name={strings('statisticsScreen.lateralEntry.discounts_values')}
                  amount={STATISTICS.discountCodeValue}
                  vat={"N/A"}
                />
                <CommonEarningItems
                  name={strings('statisticsScreen.lateralEntry.sofra_commission_amount')}
                  amount={STATISTICS.sofraFixedComission}
                  vat={"N/A"}
                />
                <CommonEarningItems
                  name={strings('statisticsScreen.lateralEntry.sofra_vat')}
                  amount={STATISTICS.sofraVatTotal}
                  vat={"N/A"}
                />
                <CommonEarningItems
                  name={strings('statisticsScreen.lateralEntry.sofra_convenience_fee')}
                  amount={STATISTICS.sofraConvenience}
                  vat={"N/A"}
                />
                <CommonEarningItems
                  name={strings('statisticsScreen.lateralEntry.partners_total_net_profit')}
                  amount={STATISTICS.partnerProfit}
                  vat={"N/A"}
                />
              </View>
            )}
          </View>
        )}
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
    ...commonFontStyle(400, 14, Colors.white),
  },
  tabText: {
    ...commonFontStyle(400, 14, Colors.darkGrey),
  },
  filterTitle: {
    ...commonFontStyle(500, 14, Colors.black),
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
    paddingVertical: hp(1.8),
    paddingHorizontal: hp(2),
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

  titles: {
    paddingHorizontal: hp(2),
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(2),
    // marginTop: hp(1),
  },
  nameTitle: { ...commonFontStyle(500, 13, Colors.black) },
  datesRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
});
