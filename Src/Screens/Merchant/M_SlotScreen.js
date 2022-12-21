import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import { Dropdown } from "react-native-element-dropdown";
import PinkButton from "../../Components/PinkButton";
import CheckBox from "@react-native-community/checkbox";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOffSlot,
  deleteOffSlot,
  getOffSlots,
} from "../../Services/MerchantApi";
import moment from "moment";
export default function M_SlotScreen({ navigation }) {
  LocaleConfig.locales["fr"] = {
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    monthNamesShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    dayNames: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    today: "Aujourd'hui",
  };
  LocaleConfig.defaultLocale = "fr";
  const dispatch = useDispatch();
  const SLOTS = useSelector((e) => e.merchant.offSlots);
  const PRELOADER = useSelector((e) => e.merchant.preLoader);
  const [MarkedDate, setMarkedDate] = useState({});
  const [current, setcurrent] = useState(moment().format("YYYY-MM-DD"));
  const calendarRef = React.useRef();
  useEffect(() => {
    dispatch({ type: "PRE_LOADER", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getOffSlots());
      setcurrent(moment().format("YYYY-MM-DD"));
      // calendarRef.current.se;
    });
  }, []);
  useEffect(() => {
    let data = {};
    SLOTS.map((item, index) => {
      data[String(moment(item.date).format("YYYY-MM-DD"))] = {
        customStyles: {
          container: {
            backgroundColor: Colors.pink,
          },
          text: {
            color: Colors.white,
          },
        },
      };
    });
    setMarkedDate(data);
  }, [SLOTS]);

  const onDeleteSlot = (id) => {
    dispatch({
      type: "DELETE_MODAL",
      payload: {
        isVisible: true,
        onDelete: () => {
          let data = {
            slotId: id,
            language: "en",
          };
          dispatch(deleteOffSlot(data));
        },
      },
    });
  };

  const addOffslot = (date) => {
    Alert.alert(
      "Are you sure?",
      "You want to add off slot for " + date.dateString,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            let data = { date: date.dateString };
            dispatch(addOffSlot(data));
          },
        },
      ]
    );
  };
  const renderItem = ({ item, index }) => (
    <View style={styles.itemList}>
      <View style={styles.row}>
        <Text style={styles.leftText}>SR</Text>
        <Text style={styles.rightText}>{index}</Text>
      </View>
      <View style={styles.middleRow}>
        <Text style={styles.leftText}>Off Slot Date</Text>
        <Text style={styles.rightText}>{moment(item.date).format("LL")}</Text>
      </View>
      <View style={styles.middleRow2}>
        <Text style={styles.leftText}>Created</Text>
        <Text style={styles.rightText}>
          {moment(item.created).format("MM/DD/YY, hh:mm A")}
        </Text>
      </View>
      <View style={styles.lastRow}>
        <Text style={styles.leftText}>Action</Text>
        <TouchableOpacity
          onPress={() => onDeleteSlot(item.id)}
          style={styles.deleteButton}
        >
          <Image
            source={require("../../Images/Merchant/xxxhdpi/ic_del.png")}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={ApplicationStyles.welcomeText}>Off Slots</Text>
        <View style={styles.whiteView}>
          <Calendar
            onDayPress={(day) => {
              addOffslot(day);
            }}
            ref={calendarRef}
            markingType={"custom"}
            markedDates={MarkedDate}
            style={styles.calender}
            enableSwipeMonths={true}
            current={current}
            key={current}
            initialDate={current}
            disableMonthChange={true}
          />
          {/* <TouchableOpacity
            onPress={() => {
              var today = new Date();
              // var selectedDate = new Date(current);
              // var diff =
              //   -(selectedDate.getMonth() - today.getMonth()) -
              //   (selectedDate.getFullYear() - today.getFullYear()) * 12;
              // calendarRef.current.addMonth(diff);

              // need to keep track of current date when swipe/date or month changes
              // for month difference calculation and therefore jump/refresh
              setcurrent(moment(today).format("YYYY-MM-DD"));
              // setcurrent(moment().format("YYYY-MM-DD"));
            }}
          >
            <Text style={styles.button}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.button}>Clear</Text>
          </TouchableOpacity> */}
        </View>
        <PinkButton
          style={styles.btn}
          name={"Submit"}
          text={"small"}
          onPress={() => {}}
        />
        <Text style={styles.mainTitle}>All Off Slots</Text>

        {!PRELOADER && (
          <FlatList
            data={SLOTS}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text style={ApplicationStyles.nodataStyle}>No Data Found</Text>
            }
          />
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  whiteView: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    overflow: "hidden",
  },
  calender: {
    backgroundColor: Colors.white,
  },
  button: {
    ...commonFontStyle("M_500", 16, Colors.black),
    textAlign: "center",
    paddingVertical: hp(2),
  },
  btn: {
    marginVertical: hp(3),
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
  lastRow: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: hp(2),
  },
  middleRow2: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: hp(1.8),
    paddingHorizontal: hp(2),
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    // borderTopColor: Colors.backgroundScreen,
    borderBottomColor: Colors.backgroundScreen,
  },
  leftText: {
    ...commonFontStyle(400, 13, Colors.black),
  },
  rightText: {
    ...commonFontStyle(400, 13, Colors.grayButtonBackground),
  },
  mainTitle: {
    ...commonFontStyle(500, 18, Colors.black),
    marginBottom: hp(2.5),
  },
  searchIcon: {
    height: hp(2),
    width: hp(2),
    resizeMode: "contain",
  },
  deleteButton: {
    paddingHorizontal: hp(2),
    paddingVertical: hp(1.8),
  },
});
