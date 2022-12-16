import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../Themes/Fonts";
import Colors from "../Themes/Colors";
import { useNavigation } from "@react-navigation/native";
import { media_url } from "../Config/AppConfig";

export default function MenuScreenItems({
  item,
  activeVisible,
  screen,
  onEdit,
  onDelete,
  status,
  onChangeStatus,
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.cardView}>
      {screen == "promocode" ? (
        <View style={styles.promoView}>
          <Image
            style={styles.menuImagePromoCode}
            source={require("../Images/Merchant/xxxhdpi/ic_persentage.png")}
          />
        </View>
      ) : (
        <Image
          style={styles.menuImage}
          source={
            item.image
              ? { uri: media_url + item.image }
              : require("../Images/Merchant/xxxhdpi/foodDish.jpeg")
          }
        />
      )}

      <Text style={styles.addText}>
        {screen == "promocode" ? item.title + "(" + item.code + ")" : item.name}
      </Text>
      <View style={styles.cardBotomBtn}>
        {screen !== "promocode" && (
          <TouchableOpacity
            onPress={() => onEdit()}
            style={styles.addMenuButton}
          >
            <Image
              style={styles.menuIconButton}
              source={require("../Images/Merchant/xxxhdpi/edit.png")}
            />
            <Text style={styles.addButton}>Edit</Text>
          </TouchableOpacity>
        )}
        {activeVisible == true && (
          <TouchableOpacity
            onPress={() => onChangeStatus()}
            style={[
              styles.addMenuButton,
              {
                backgroundColor: status == 1 ? Colors.green : Colors.red,
              },
            ]}
          >
            <Image
              style={styles.menuIconButton}
              source={require("../Images/Merchant/xxxhdpi/ic_tick.png")}
            />
            <Text style={styles.addButton}>
              {status == 1 ? "Active" : "In-Active"}
            </Text>
          </TouchableOpacity>
        )}
        {screen !== "promocode" && (
          <TouchableOpacity
            style={[
              styles.addMenuButton,
              {
                backgroundColor: Colors.grayButtonBackground,
              },
            ]}
            onPress={() => onDelete()}
          >
            <Image
              style={styles.menuIconButton}
              source={require("../Images/Merchant/xxxhdpi/delete.png")}
            />
            <Text style={styles.addButton}>Delete</Text>
          </TouchableOpacity>
        )}
        {(!activeVisible || screen == "promocode") && (
          <View style={{ opacity: 0 }}>
            <TouchableOpacity
              style={[
                styles.addMenuButton,
                {
                  backgroundColor: Colors.green,
                },
              ]}
            >
              <Image
                style={styles.menuIconButton}
                source={require("../Images/Merchant/xxxhdpi/ic_tick.png")}
              />
              <Text style={styles.addButton}>Active</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardView: {
    borderRadius: 15,
    backgroundColor: Colors.white,
    overflow: "hidden",
    marginRight: hp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6.27,
    width: hp(34),
    elevation: 5,
    marginBottom: hp(3),
  },

  addText: {
    ...commonFontStyle(500, 14, Colors.black),
    marginHorizontal: hp(2),
  },
  addButton: {
    ...commonFontStyle("M_600", 11, Colors.white),
  },
  addMenuButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: hp(1.3),
    paddingVertical: hp(1.3),
    backgroundColor: Colors.pink,
    marginTop: hp(2),
    borderRadius: 5,
  },
  menuImage: {
    marginBottom: hp(1.5),
    height: hp(20),
    width: hp(34),
    resizeMode: "cover",
  },
  menuImagePromoCode: {
    // marginBottom: hp(1.5),
    height: hp(15),
    width: hp(34),
    resizeMode: "contain",
    backgroundColor: Colors.pink,
  },
  promoView: {
    height: hp(20),
    width: hp(34),
    backgroundColor: Colors.pink,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp(1.5),
  },
  cardBotomBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: hp(1.5),
    marginBottom: hp(2.5),
    justifyContent: "space-between",
  },
  menuIconButton: {
    height: hp(1.8),
    width: hp(1.8),
    resizeMode: "contain",
    tintColor: Colors.white,
    marginRight: 5,
  },
});
