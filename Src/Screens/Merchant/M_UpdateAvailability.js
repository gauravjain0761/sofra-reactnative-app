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
import { getAvailbility, updateAvailbility } from "../../Services/MerchantApi";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
import RegistrationTextInput from "../../Components/RegistrationTextInput";
import {
  dispatchErrorAction,
  getDataJsonAvailability,
  getFromDataJson,
} from "../../Services/CommonFunctions";
import DateTimePickerView from "../../Components/DateTimePickerView";

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
  const [selectedDay, setSelectedDay] = useState("");
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
        dispatchErrorAction(dispatch, "Please select closing time");
      }
    } else {
      dispatchErrorAction(dispatch, "Please select opening time");
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

  const onUpdateAvailability = () => {
    let temp = [];
    availability.forEach((element) => {
      if (element.status == 1) {
        temp.push(element);
      }
    });
    let day = getDataJsonAvailability(temp, "day");
    let openingTime = getDataJsonAvailability(temp, "openingTime");
    let closingTime = getDataJsonAvailability(temp, "closingTime");
    let data = { ...day, ...openingTime, ...closingTime };
    dispatch(updateAvailbility(data));
  };

  const handleConfirm = (date) => {
    let data = Object.assign([], availability);
    data.map((element) => {
      if (element.day == selectedDay.day) {
        if (timeType == "open") {
          element.openingTime = moment(date).format("HH:mm:ss");
        } else {
          element.closingTime = moment(date).format("HH:mm:ss");
        }
      }
    });
    setavailability(data);
    setDatePickerVisibility(false);
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
            <DateTimePickerView
              value={openTime}
              format={"HH:mm:ss"}
              placeHolder={"Select Opening Time"}
              onPressPicker={() => {
                settimepickerSameTime(true), setTimeType("open");
              }}
              width={"100%"}
            />
            <DateTimePickerView
              value={closeTime}
              format={"HH:mm:ss"}
              placeHolder={"Select Closing Time"}
              onPressPicker={() => {
                settimepickerSameTime(true), setTimeType("close");
              }}
              width={"100%"}
            />

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
                    setDatePickerVisibility(true),
                      setSelectedDay(item),
                      setTimeType("open");
                  }}
                  style={styles.timeBox}
                >
                  <Text style={{ ...commonFontStyle(400, 14, Colors.black) }}>
                    {item.openingTime}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDatePickerVisibility(true),
                      setSelectedDay(item),
                      setTimeType("close");
                  }}
                  style={styles.timeBox}
                >
                  <Text style={{ ...commonFontStyle(400, 14, Colors.black) }}>
                    {item.closingTime}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <PinkButton
          onPress={() => onUpdateAvailability()}
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
        onConfirm={handleConfirm}
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
    marginRight: hp(1),
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

  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
});
