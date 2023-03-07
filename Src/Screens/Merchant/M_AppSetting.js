import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  I18nManager,
} from "react-native";
import React, { useState, useEffect } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import { Dropdown } from "react-native-element-dropdown";
import PinkButton from "../../Components/PinkButton";
import CheckBox from "@react-native-community/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { getAppSetting, UpdateAppSetting } from "../../Services/MerchantApi";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { strings } from "../../Config/I18n";
import { language } from "../../Config/StaticDropdownData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";

export default function M_AppSetting() {
  console.log("i18Manager ==>", I18nManager.isRTL);
  const dispatch = useDispatch();
  const isTakingOrders = useSelector((e) => e.merchant.isTakingOrders);
  const [switchEmable, setswitchEmable] = useState(false);
  const [langSelect, setlangSelect] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(getAppSetting());
      AsyncStorage.getItem("Language").then((res) => {
        console.log("res", res);
        res == "en"
          ? setlangSelect(language[0].name)
          : setlangSelect(language[1].name);
      });
    });
  }, []);
  useEffect(() => {
    setswitchEmable(isTakingOrders);
  }, [isTakingOrders]);
  const onUpdateAppSetting = () => {
    let data = {
      isTakingOrders: switchEmable == true ? "YES" : "NO",
    };
    dispatch(UpdateAppSetting(data));
    onLanguageSelect(langSelect);
  };
  const onLanguageSelect = async (languageSelected) => {
    console.log("onLanguage select call", languageSelected);
    try {
      const lang = languageSelected == "English" ? "en" : "ar";
      await AsyncStorage.setItem("Language", lang);
      AsyncStorage.getItem("Language").then((res) => {
        if (res === "ar") {
          I18nManager.forceRTL(true);
        } else {
          I18nManager.forceRTL(false);
        }
        RNRestart.Restart();
      });
    } catch (e) {}
  };
  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          {strings("appSetting.update_app_settings")}
        </Text>
        <View style={styles.row}>
          <Text style={[styles.title2, { marginBottom: 0 }]}>
            {strings("appSetting.taking_orders")}
          </Text>
          <Switch
            ios_backgroundColor={"#cccccc"}
            trackColor={{
              false: Colors.placeholderColor,
              true: Colors.pink,
            }}
            thumbColor={switchEmable ? Colors.white : Colors.white}
            style={{
              transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
              marginTop: 0,
            }}
            onValueChange={() => setswitchEmable(!switchEmable)}
            value={switchEmable}
          />
        </View>

        <View style={{ ...styles.row }}>
          <Text style={[styles.title2, { marginTop: 20 }]}>
            {strings("appSetting.lateralEntry.select_language")}
          </Text>
          <RegistrationDropdown
            data={language}
            value={langSelect}
            setData={(text) => {
              setlangSelect(text);
              onLanguageSelect(text);
            }}
            placeholder={langSelect}
            valueField={"name"}
            style={{ width: 130, height: 30, marginTop: 40 }}
            placeholderTextColor={Colors.black}
          />
        </View>
        <PinkButton
          onPress={() => {
            onUpdateAppSetting();
          }}
          style={styles.dbuttonStyle}
          text={"small"}
          name={strings("appSetting.update_settings")}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  dbuttonStyle: {
    marginTop: hp(15),
  },
  title: {
    ...commonFontStyle(500, 18, Colors.black),
    marginBottom: hp(3),
    marginTop: hp(8),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
  title2: {
    ...commonFontStyle(400, 17, Colors.darkGrey),
  },
});
