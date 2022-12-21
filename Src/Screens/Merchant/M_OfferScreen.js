import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import { Dropdown } from "react-native-element-dropdown";
import PinkButton from "../../Components/PinkButton";
import { DeleteOffer, getOffers } from "../../Services/MerchantApi";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function M_OfferScreen({ navigation }) {
  const dispatch = useDispatch();
  const OFFERS = useSelector((e) => e.merchant.offers);
  const PRELOADER = useSelector((e) => e.merchant.preLoader);
  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.itemList}>
      <View style={styles.row}>
        <Text style={styles.leftText}>Offer Detail</Text>
        <Text style={styles.rightText}>{item.title}</Text>
      </View>
      <View style={styles.middleRow}>
        <Text style={styles.leftText}>User</Text>
        <Text style={styles.rightText}>{item.user.name}</Text>
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
          onPress={() => onDeleteOffer(item.id)}
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
  useEffect(() => {
    dispatch({ type: "PRE_LOADER", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getOffers());
    });
  }, []);

  const onDeleteOffer = (id) => {
    dispatch({
      type: "DELETE_MODAL",
      payload: {
        isVisible: true,
        onDelete: () => {
          let data = {
            offerId: id,
            language: "en",
          };
          dispatch(DeleteOffer(data));
        },
      },
    });
  };
  return (
    <View style={ApplicationStyles.mainView}>
      <PinkButton
        onPress={() => {
          navigation.navigate("M_CreateOfferScreen");
        }}
        style={styles.dbuttonStyle}
        text={"small"}
        name={"Create Offer"}
      />
      {!PRELOADER && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={OFFERS}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={ApplicationStyles.nodataStyle}>No Data Found</Text>
          }
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  dbuttonStyle: {
    marginVertical: hp(2),
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
  lastRow: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: hp(2),
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
