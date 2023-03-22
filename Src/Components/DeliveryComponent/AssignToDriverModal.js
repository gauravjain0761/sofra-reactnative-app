import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../Themes/Colors";
import { commonFontStyle, SCREEN_WIDTH } from "../../Themes/Fonts";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import OrderItems from "../../Components/OrderItems";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../Services/MerchantApi";
import { orderStatusData } from "../../Constant/Constant";
import moment from "moment";
import PinkButton from "../PinkButton";
import RegistrationDropdown from "../RegistrationDropdown";

export default function AssignToDriverModal({
  modalVisible,
  onClose,
  onDriverChange,
  driverAlready,
}) {
  const dispatch = useDispatch();

  const DRIVERS = useSelector((e) => e.delivery.drivers);
  const [driver, setDriver] = useState("");
  useState(() => {
    if (driverAlready) {
      setDriver(driverAlready.id);
    }
  });

  return (
    <Modal
      isVisible={modalVisible}
      // deviceWidth={SCREEN_WIDTH}
      style={ApplicationStyles.modalStyle}
      onBackButtonPress={() => onClose()}
      onBackdropPress={() => onClose()}
    >
      <View
        style={[
          ApplicationStyles.modalViewStyle,
          { paddingVertical: hp(4), paddingHorizontal: hp(2) },
        ]}
      >
        <Text style={styles.title}>Choose Driver From Below List</Text>

        {DRIVERS.length == 0 ? (
          <Text style={ApplicationStyles.nodataStyle}>
            There is no any driver, please add drivers
          </Text>
        ) : (
          <View style={{ marginVertical: hp(2) }}>
            <RegistrationDropdown
              data={DRIVERS}
              value={driver}
              setData={(text) => {
                setDriver(text);
              }}
              placeholder={"Choose Driver"}
              valueField={"id"}
              labelField={"itemDisplay"}
              style={styles.dropdownRow}
            />
          </View>
        )}

        <View style={styles.buttonRow}>
          <View style={{ width: "58%" }}>
            <PinkButton
              onPress={() => onDriverChange(driver)}
              text={"small"}
              name={"Save Changes"}
            />
          </View>
          <View style={{ width: "38%" }}>
            <PinkButton
              onPress={() => onClose()}
              style={{ backgroundColor: Colors.grayButtonBackground }}
              text={"small"}
              name={"Cancel"}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    ...commonFontStyle("M_600", 20, Colors.black),
    paddingVertical: hp(2),
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    // flex: 1,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  dropdownRow: {
    borderWidth: 1,
    borderColor: Colors.placeholderColor,
  },
});
