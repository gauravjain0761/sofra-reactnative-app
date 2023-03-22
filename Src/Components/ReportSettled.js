import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  PermissionsAndroid,
} from "react-native";
import React, { useState } from "react";
import ApplicationStyles from "../Themes/ApplicationStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { commonFontStyle } from "../Themes/Fonts";
import Colors from "../Themes/Colors";
import RegistrationTextInput from "../Components/RegistrationTextInput";
import PinkButton from "../Components/PinkButton";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import RNFetchBlob from "rn-fetch-blob";
import XLSX from "xlsx";
import { DownloadDirectoryPath, writeFile } from "react-native-fs";
import {
  dispatchSuccessAction,
  exportToCsv,
} from "../Services/CommonFunctions";
import { string } from "i/lib/util";
import { strings } from "../Config/I18n";
export default function ReportSettled({ reportType }) {
  const setteled_report = useSelector((e) => e.merchant.setteled_report);
  const unsetteled_report = useSelector((e) => e.merchant.unsetteled_report);
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
        name={strings("orders.lateralEntry.export_to_CSV")}
        onPress={() => {
          exportToCsv(REPORT, reportType, dispatch, "merchant");
        }}
        text={"small"}
      />
      <View>
        <Text style={styles.tabTitle}>{reportType}</Text>
        {REPORT?.items && REPORT?.items?.length !== 0 ? (
          REPORT.items.map((element, index) => {
            return (
              <View style={styles.itemList}>
                <ItemRender name={"Menu Categorysr#"} value={index + 1} />
                <ItemRender
                  name={"Menu Categoryid"}
                  value={element.bookingCode}
                />
                <ItemRender
                  name={"Order date"}
                  value={moment(element.created).format("YYYY-MM-DD")}
                />
                <ItemRender
                  name={"Time"}
                  value={moment(element.created).format("hh:mm A")}
                />
                <ItemRender
                  name={"Mode of payment"}
                  value={element.paymentType}
                />

                <ItemRender
                  name={"Sub total"}
                  value={"AED " + element.itemsPrice}
                />
                <ItemRender
                  name={"Discount"}
                  value={"-AED " + element.discount}
                />
                <ItemRender
                  name={"Net Amount"}
                  value={"AED " + (element.itemsPrice - element.discount)}
                />
                <ItemRender name={"VAT"} value={"AED " + element.vat} />
                <ItemRender
                  name={"Gross Amount"}
                  value={
                    "AED " +
                    (element.itemsPrice - element.discount + element.vat)
                  }
                />
                <ItemRender
                  name={"Sofra comissionable amount"}
                  value={"AED " + element.itemsPrice}
                />
                <ItemRender
                  name={"Sofra comission"}
                  value={"% " + element.comissionPercentage}
                />
              </View>
            );
          })
        ) : (
          <View>
            <Text style={ApplicationStyles.nodataStyle}>
              {strings("orders.lateralEntry.no_data_found")}
            </Text>
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
