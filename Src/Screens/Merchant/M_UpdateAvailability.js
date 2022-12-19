import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
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
import CheckBox from "@react-native-community/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { getAvailbility } from "../../Services/MerchantApi";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
import RegistrationTextInput from "../../Components/RegistrationTextInput";
import { dispatchErrorAction } from "../../Services/CommonFunctions";

export default function M_UpdateAvailability({ navigation }) {
  const [everydayEnable, seteverydayEnable] = useState(false);
  const [sameTimingEnable, setsameTimingEnable] = useState(false);
  const dispatch = useDispatch();
  const AVAILABILITY = useSelector((e) => e.merchant.availability);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [timepickerSameTime, settimepickerSameTime] = useState(false);
  const [openTime, setopenTime] = useState("");
  const [closeTime, setcloseTime] = useState("");
  const [timeType, setTimeType] = useState("");
  const [availability, setavailability] = useState(AVAILABILITY);
  useEffect(() => {
    dispatch({ type: "PRE_LOADER", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getAvailbility());
    });
  }, []);
  useEffect(() => {
    setavailability(AVAILABILITY);
  }, [AVAILABILITY]);

  const applysameTime = () => {
    setopenTime("");
    setcloseTime("");
    setsameTimingEnable(!sameTimingEnable);
  };

  const handleConfirmSameTime = (date) => {
    if (timeType == "open") {
      setopenTime(date);
    } else {
      setcloseTime(date);
    }
    settimepickerSameTime(false);
  };
  const onPressCancel = () => {
    applysameTime();
  };

  const onPressSave = () => {
    let data = Object.assign([], availability);
    if (openTime !== "") {
      if (closeTime !== "") {
        data.forEach((element) => {
          element.openingTime = openTime;
          element.closingTime = closeTime;
        });
        setavailability(data);
        applysameTime();
      } else {
        dispatchErrorAction("Please select closing time");
      }
    } else {
      dispatchErrorAction("Please select opening time");
    }
  };
  const onPressEveryDay = () => {
    if (everydayEnable == true) {
      seteverydayEnable(!everydayEnable);
      let data = Object.assign([], availability);
      data.forEach((element) => {
        element.status = 0;
      });
      setavailability(data);
    } else {
      seteverydayEnable(true);
      let data = Object.assign([], availability);
      data.forEach((element) => {
        element.status = 1;
      });
      setavailability(data);
    }
  };

  const onPressDay = (index) => {
    let data = Object.assign([], availability);
    data[index].status = data[index].status == 1 ? 0 : 1;
    setavailability(data);
  };
  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={ApplicationStyles.welcomeText}>Update Availabilites</Text>
        <Text style={styles.title}>Update Availabilites Here</Text>

        <View style={styles.row1}>
          <TouchableOpacity
            onPress={() => onPressEveryDay()}
            style={styles.row1}
          >
            <Image
              style={styles.checkIcon}
              source={
                everydayEnable
                  ? require("../../Images/Merchant/xxxhdpi/ic_check.png")
                  : require("../../Images/Merchant/xxxhdpi/ic_uncheck.png")
              }
            />
            <Text style={styles.nameText}>Everday</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => applysameTime()}
            style={[styles.row1, { marginLeft: hp(2) }]}
          >
            <Image
              style={styles.checkIcon}
              source={
                sameTimingEnable
                  ? require("../../Images/Merchant/xxxhdpi/ic_check.png")
                  : require("../../Images/Merchant/xxxhdpi/ic_uncheck.png")
              }
            />
            <Text style={styles.nameText}>Apply Same Timings</Text>
          </TouchableOpacity>
        </View>

        {sameTimingEnable == true && (
          <View style={styles.sameView}>
            <Text style={styles.detailText}>Apply Same Timings Everyday</Text>
            <TouchableOpacity
              onPress={() => {
                settimepickerSameTime(true), setTimeType("open");
              }}
              style={styles.input}
            >
              <Text style={openTime ? styles.timeText : styles.placeHolder}>
                {openTime !== ""
                  ? moment(openTime).format("HH:mm")
                  : "Select Opening Time"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                settimepickerSameTime(true), setTimeType("close");
              }}
              style={styles.input}
            >
              <Text style={closeTime ? styles.timeText : styles.placeHolder}>
                {closeTime !== ""
                  ? moment(closeTime).format("HH:mm")
                  : "Select Closing Time"}
              </Text>
            </TouchableOpacity>
            <View style={styles.buttonRow}>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <PinkButton
                  onPress={() => onPressSave()}
                  text={"small"}
                  name={"Save"}
                />
              </View>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <PinkButton
                  onPress={() => onPressCancel()}
                  style={{ backgroundColor: Colors.grayButtonBackground }}
                  text={"small"}
                  name={"Cancel"}
                />
              </View>
            </View>
          </View>
        )}

        <View style={styles.mainTable}>
          <View style={styles.row1}>
            <View style={{ flex: 1 }}>
              <Text style={styles.tableTitlea}>Days</Text>
            </View>
            <View style={styles.timeBox}>
              <Text style={styles.tableTitlea}>Open</Text>
            </View>
            <View style={styles.timeBox}>
              <Text style={styles.tableTitlea}>Close</Text>
            </View>
          </View>
          {availability.map((item, index) => {
            return (
              <View style={styles.rowDays}>
                <TouchableOpacity
                  onPress={() => onPressDay(index)}
                  style={styles.dayRowView}
                >
                  <Image
                    style={styles.checkIcon}
                    source={
                      item.status == 1
                        ? require("../../Images/Merchant/xxxhdpi/ic_check.png")
                        : require("../../Images/Merchant/xxxhdpi/ic_uncheck.png")
                    }
                  />
                  <Text style={styles.nameText}>{item.day}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDatePickerVisibility(true), setTimeType("open");
                  }}
                  style={styles.timeBox}
                >
                  <Text style={{ ...commonFontStyle(400, 14, Colors.black) }}>
                    {moment(item.openingTime).format("HH:mm")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDatePickerVisibility(true), setTimeType("close");
                  }}
                  style={styles.timeBox}
                >
                  <Text style={{ ...commonFontStyle(400, 14, Colors.black) }}>
                    {moment(item.closingTime).format("HH:mm")}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <PinkButton
          onPress={() => {}}
          style={styles.dbuttonStyle}
          text={"small"}
          name={"Update Availability"}
        />
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        is24Hour={true}
        locale="en_GB"
        // onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <DateTimePickerModal
        isVisible={timepickerSameTime}
        mode="time"
        is24Hour={true}
        locale="en_GB"
        onConfirm={handleConfirmSameTime}
        onCancel={() => settimepickerSameTime(false)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    ...commonFontStyle(600, 18, Colors.black),
    marginBottom: hp(1.5),
    // marginTop: hp(2),
  },
  sameView: {
    marginTop: hp(1.5),
  },
  row1: {
    alignItems: "center",
    flexDirection: "row",
  },
  rowDays: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.white,
    marginBottom: hp(1.5),
    paddingVertical: 8,
  },
  checkIcon: {
    height: hp(2.8),
    width: hp(2.8),
    resizeMode: "contain",
    marginRight: 10,
  },
  dayRowView: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: hp(1),
    // backgroundColor: "pink",
    flex: 1,
  },
  nameText: {
    ...commonFontStyle(400, 15, Colors.grayButtonBackground),
  },
  timeBox: {
    marginRight: hp(2),
    backgroundColor: Colors.registrationBackground,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  tableTitlea: {
    ...commonFontStyle(500, 15, Colors.black),
  },
  mainTable: {
    marginVertical: hp(2),
  },
  dbuttonStyle: {
    marginBottom: hp(3),
  },
  detailText: {
    ...commonFontStyle(500, 16, Colors.black),
    textAlign: "center",
    marginBottom: hp(1),
  },
  titleView: {
    paddingVertical: hp(2.5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.registrationBackground,
  },
  menuIconButton: {
    height: hp(2),
    width: hp(2),
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    padding: hp(2.5),
  },
  row: {
    // alignItems: "center",

    paddingVertical: hp(1.5),
    paddingHorizontal: hp(1.5),
  },
  input: {
    backgroundColor: Colors.white,
    marginBottom: hp(2),
    width: "100%",
    height: hp(6),
    paddingHorizontal: hp(2),
    borderRadius: 5,
    justifyContent: "center",
  },
  timeText: {
    ...commonFontStyle(400, 14, Colors.black),
  },
  placeHolder: {
    ...commonFontStyle(400, 14, Colors.placeholderColor),
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
});
