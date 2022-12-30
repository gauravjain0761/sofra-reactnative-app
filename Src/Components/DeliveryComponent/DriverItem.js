import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { media_url } from "../../Config/AppConfig";
import { useDispatch } from "react-redux";
import { deleteDriver, updateDriverStatus } from "../../Services/DeliveryApi";
import { useNavigation } from "@react-navigation/native";

export default function DriverItem({ item, index }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onupdateDriverStatus = (id) => {
    let data = { status: item.status == 1 ? 0 : 1, driverId: id };
    dispatch(updateDriverStatus(data));
  };

  const onDeleteDriver = (id) => {
    dispatch({
      type: "DELETE_MODAL",
      payload: {
        isVisible: true,
        onDelete: () => {
          let data = { driverId: id };
          dispatch(deleteDriver(data));
        },
      },
    });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 4,
        paddingVertical: 4,
        borderBottomWidth: 0.7,
        borderColor: Colors.darkGrey,
      }}
    >
      <View style={{ flex: 0.2 }}>
        <Image
          style={{ height: wp(16), width: wp(16), borderRadius: wp(16) / 2 }}
          source={
            item.picture
              ? { uri: media_url + item.picture }
              : require("../../Images/Delivery/xxxhdpi/profile_placeholder.png")
          }
        />
      </View>
      <View style={{ flex: 0.8 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.mailText}>{item.email}</Text>
            <Text style={styles.mailText}>{item.phone}</Text>
          </View>
          <View>
            <Text style={styles.statusText}>
              {item.isAvailable == 1 ? "Available" : "Not Available"}
            </Text>
          </View>
        </View>
        <View style={styles.cardBotomBtn}>
          <TouchableOpacity
            onPress={() => navigation.navigate("D_EditDriverScreen", item)}
            style={styles.addMenuButton}
          >
            <Image
              style={styles.menuIconButton}
              source={require("../../Images/Merchant/xxxhdpi/edit.png")}
            />
            <Text style={styles.addButton}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onupdateDriverStatus(item.id)}
            style={[
              styles.addMenuButton,
              {
                backgroundColor: item.status == 1 ? Colors.green : Colors.red,
              },
            ]}
          >
            <Image
              style={styles.menuIconButton}
              source={require("../../Images/Merchant/xxxhdpi/ic_tick.png")}
            />
            <Text style={styles.addButton}>
              {item.status == 1 ? "Active" : "In-Active"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.addMenuButton,
              {
                backgroundColor: Colors.grayButtonBackground,
              },
            ]}
            onPress={() => onDeleteDriver(item.id)}
          >
            <Image
              style={styles.menuIconButton}
              source={require("../../Images/Merchant/xxxhdpi/delete.png")}
            />
            <Text style={styles.addButton}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nameText: {
    ...commonFontStyle(700, 14, Colors.black),
  },
  mailText: {
    ...commonFontStyle(400, 14, Colors.darkGrey),
  },
  statusText: {
    ...commonFontStyle(700, 14, Colors.pink),
  },
  cardBotomBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(2.5),
    justifyContent: "space-between",
  },
  addMenuButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: hp(1.3),
    paddingVertical: hp(1.3),
    backgroundColor: Colors.pink,
    marginTop: hp(2),
    // marginRight: hp(3),
    borderRadius: 5,
  },
  menuIconButton: {
    height: hp(1.8),
    width: hp(1.8),
    resizeMode: "contain",
    tintColor: Colors.white,
    marginRight: 5,
  },
  addButton: {
    ...commonFontStyle("M_600", 11, Colors.white),
  },
});
