import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import RegistrationTextInput from "../../Components/RegistrationTextInput";
import PinkButton from "../../Components/PinkButton";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { exportToCsv } from "../../Services/CommonFunctions";

export default function D_ReportSettled({ reportType }) {
  const setteled_report = useSelector((e) => e.delivery.setteled_report);
  const unsetteled_report = useSelector((e) => e.delivery.unsetteled_report);
  const dispatch = useDispatch();
  const REPORT =
    Object.keys(setteled_report).length == 0
      ? unsetteled_report
      : setteled_report;

  const ItemRender = ({ name, value }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.leftText}>{name}</Text>
        <Text style={styles.rightText}>{value}</Text>
      </View>
    );
  };

  return (
    <View>
      <PinkButton
        name={"Export to CSV"}
        onPress={() => {
          exportToCsv(REPORT, reportType, dispatch, "company");
        }}
        text={"small"}
      />
      <View>
        <Text style={styles.tabTitle}>{reportType + "s"}</Text>
        {REPORT?.items && REPORT?.items?.length !== 0 ? (
          REPORT.items.map((element, index) => {
            return (
              <View style={styles.itemList}>
                <ItemRender name={"SR#"} value={index + 1} />
                <ItemRender name={"Driver"} value={element?.driver?.name} />
                <ItemRender name={"Order id"} value={element.bookingCode} />
                <ItemRender
                  name={"Mode of payment"}
                  value={element.paymentType}
                />
                <ItemRender
                  name={"Order date"}
                  value={moment(element.created).format("YYYY-MM-DD")}
                />

                <ItemRender
                  name={"Sofra account status"}
                  value={element.amountDepositedToSofra}
                />
                <ItemRender
                  name={"Delivery duration"}
                  value={element.timeSpendForDelivery + " min"}
                />
                <ItemRender
                  name={"Delivery Charges(Vat Inc)"}
                  value={
                    "AED " + (element.serviceCharges + element.deliveryVat)
                  }
                />
                <ItemRender
                  name={"Convenient Fee"}
                  value={"AED " + element.convenienceFeeAmount}
                />
                <ItemRender name={"Penalty"} value={"AED " + element.penalty} />
                <ItemRender
                  name={"Balance to Receive,"}
                  value={"AED " + element.receiveAbleAmount}
                />
              </View>
            );
          })
        ) : (
          <View>
            <Text style={ApplicationStyles.nodataStyle}>No Data Found</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemList: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: hp(1.5),
  },
  row: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: hp(2),
    paddingHorizontal: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundScreen,
  },

  leftText: {
    ...commonFontStyle(400, 13, Colors.black),
  },
  rightText: {
    ...commonFontStyle(400, 13, Colors.grayButtonBackground),
  },
  tabTitle: {
    ...commonFontStyle(500, 16, Colors.black),
    marginVertical: hp(2.5),
  },
});
