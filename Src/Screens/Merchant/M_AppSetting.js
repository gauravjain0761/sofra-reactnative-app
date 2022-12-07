import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
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

export default function M_AppSetting() {
  const dispatch = useDispatch();
  const isTakingOrders = useSelector((e) => e.merchant.isTakingOrders);
  const [switchEmable, setswitchEmable] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch({ type: "PRE_LOADER", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getAppSetting());
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
  };
  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Update App Settings Here</Text>
        <View style={styles.row}>
          <Text style={[styles.title2, { marginBottom: 0 }]}>
            Taking Orders
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
        <PinkButton
          onPress={() => {
            onUpdateAppSetting();
          }}
          style={styles.dbuttonStyle}
          text={"small"}
          name={"Update Settings"}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  welcomeText: {
    ...commonFontStyle("M_500", 18, Colors.pink),
    marginTop: 5,
    marginBottom: hp(3),
    textAlign: "center",
  },
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
