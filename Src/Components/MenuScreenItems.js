import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../Themes/Fonts";
import Colors from "../Themes/Colors";
import { useNavigation } from "@react-navigation/native";
import { media_url } from "../Config/AppConfig";
import PlaceHolderImage from "./PlaceHolderImage";
import { useEffect } from "react";
import { getLanguage } from "../Services/asyncStorage";
import { useState } from "react";
import { strings } from "../Config/I18n";

export default function MenuScreenItems({
  item,
  activeVisible,
  screen,
  onEdit,
  onDelete,
  status,
  onChangeStatus,
  index,
}) {
  const [lan, setlan] = useState("en");
  useEffect(async () => {
    let lang = await getLanguage();
    setlan(lang);
  }, []);
  const navigation = useNavigation();
  return (
    <View key={index} style={styles.cardView}>
      {screen == "promocode" ? (
        <PlaceHolderImage image={item.image} style={styles.menuImage} />
      ) : screen == "category" ? (
        <Image
          style={[
            styles.menuImage,
            {
              height: hp(20),
              resizeMode: "contain",
              width: hp(10),
              alignSelf: "center",
            },
          ]}
          source={require("../Images/Merchant/xxxhdpi/ic_fork.png")}
        />
      ) : (
        <PlaceHolderImage image={item.image} style={styles.menuImage} />
      )}

      <Text style={styles.addText}>
        {screen == "promocode"
          ? lan == "en"
            ? item.title
            : item.title_ar + "(" + item.code + ")"
          : lan == "en"
          ? item.name
          : item.name_ar}
      </Text>
      <View
        style={[
          styles.cardBotomBtn,
          // { flexDirection: lan == "en" ? "row" : "row-reverse" },
        ]}
      >
        {screen !== "promocode" && (
          <TouchableOpacity
            onPress={() => onEdit()}
            style={[
              styles.addMenuButton,
              {
                flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
              },
            ]}
          >
            <Image
              style={styles.menuIconButton}
              source={require("../Images/Merchant/xxxhdpi/edit.png")}
            />
            <Text style={styles.addButton}>{strings("menu_screen.edit")}</Text>
          </TouchableOpacity>
        )}
        {activeVisible == true && (
          <TouchableOpacity
            onPress={() => onChangeStatus()}
            style={[
              styles.addMenuButton,
              {
                flexDirection: I18nManager.isRTL ? "row-reverse" : "row",

                backgroundColor: status == 1 ? Colors.green : Colors.red,
              },
            ]}
          >
            <Image
              style={styles.menuIconButton}
              source={require("../Images/Merchant/xxxhdpi/ic_tick.png")}
            />
            <Text style={styles.addButton}>
              {status == 1
                ? strings("menu_screen.active")
                : strings("menu_screen.inAcitive")}
            </Text>
          </TouchableOpacity>
        )}
        {screen !== "promocode" && (
          <TouchableOpacity
            style={[
              styles.addMenuButton,
              {
                flexDirection: I18nManager.isRTL ? "row-reverse" : "row",

                backgroundColor: Colors.grayButtonBackground,
              },
            ]}
            onPress={() => onDelete()}
          >
            <Image
              style={styles.menuIconButton}
              source={require("../Images/Merchant/xxxhdpi/delete.png")}
            />
            <Text style={styles.addButton}>
              {strings("menu_screen.deleta")}
            </Text>
          </TouchableOpacity>
        )}
        {(!activeVisible || screen == "promocode") && (
          <View style={{ opacity: 0 }}>
            <TouchableOpacity
              style={[
                styles.addMenuButton,
                {
                  flexDirection: I18nManager.isRTL ? "row-reverse" : "row",

                  backgroundColor: Colors.green,
                },
              ]}
            >
              <Image
                style={styles.menuIconButton}
                source={require("../Images/Merchant/xxxhdpi/ic_tick.png")}
              />
              <Text style={styles.addButton}>
                {strings("menu_screen.active")}
              </Text>
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
    textAlign: "left",
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
    height: hp(20),
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
