import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  I18nManager,
} from "react-native";
import React, { useState } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import PinkButton from "../../Components/PinkButton";
import {
  dispatchErrorAction,
  getFromDataJson,
} from "../../Services/CommonFunctions";
import { useDispatch, useSelector } from "react-redux";
import { AddOffer } from "../../Services/MerchantApi";
import { offerUserData } from "../../Config/StaticDropdownData";
import { strings } from "../../Config/I18n";
import { getLanguage } from "../../Services/asyncStorage";
import { useEffect } from "react";

export default function M_CreateOfferScreen({ navigation }) {
  const dispatch = useDispatch();
  const [Detail, setDetail] = useState("");
  const [Users, setUsers] = useState([]);
  const [userType, setuserType] = useState("");
  const [lan, setlan] = useState("en");
  useEffect(async () => {
    let lang = await getLanguage();
    setlan(lang);
  }, []);
  const USERS = useSelector((e) => e.merchant.users);
  const onCreateOffer = () => {
    if (Detail.trim() !== "") {
      if (userType !== "") {
        if (userType == "ALL") {
          let data = { title: Detail, type: "ALL" };
          dispatch(
            AddOffer(data, () => {
              navigation.navigate("M_OfferScreen");
            })
          );
        } else {
          if (Users.length !== 0) {
            let userIdJson = getFromDataJson(USERS, Users, "userIds");
            let data = { title: Detail, type: "SPECIFIC", ...userIdJson };
            dispatch(
              AddOffer(data, () => {
                navigation.navigate("M_OfferScreen");
              })
            );
          } else {
            dispatchErrorAction(
              dispatch,
              strings("validationString.please_select_users")
            );
          }
        }
      } else {
        dispatchErrorAction(
          dispatch,
          strings("validationString.please_select_users")
        );
      }
    } else {
      dispatchErrorAction(
        dispatch,
        strings("validationString.please_enter_offer_detail")
      );
    }
  };
  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView>
        <Text style={ApplicationStyles.welcomeText}>
          {strings("offerSummary.offer_detail")}
        </Text>
        <Text style={styles.inputName}>{`${strings(
          "offerSummary.offer_detail"
        )}*`}</Text>
        <TextInput
          value={Detail}
          onChangeText={(text) => setDetail(text)}
          multiline={true}
          style={styles.textInput}
          placeholder={strings("offerSummary.Enter_Detail")}
          placeholderTextColor={Colors.darkGrey}
          textAlignVertical={"top"}
        />
        <Text style={styles.bottomText}>
          {strings("offerSummary.please_enter_offer_detail")}
        </Text>
        <Text
          style={[styles.inputName, { marginTop: hp(3), marginBottom: hp(2) }]}
        >
          {`${strings("offerSummary.user")}*`}
        </Text>

        <RegistrationDropdown
          data={offerUserData}
          value={userType}
          setData={(text) => {
            setuserType(text);
          }}
          placeholder={strings("offerSummary.lateralEntry.type")}
          valueField={"name"}
          labelField={lan == "en" ? "label" : "name_ar"}
          style={styles.dropdownRow}
          placeholderTextColor={Colors.black}
        />
        <Text style={styles.bottomText}>
          {strings("offerSummary.lateralEntry.please_select_here")}
        </Text>
        {userType == "SPECIFIC" && (
          <View>
            <Text
              style={[
                styles.inputName,
                { marginTop: hp(3), marginBottom: hp(2) },
              ]}
            >
              {`${strings("offerSummary.lateralEntry.select_user")}*`}
            </Text>
            <RegistrationDropdown
              data={USERS}
              value={Users}
              setData={(text) => {
                setUsers(text);
              }}
              multiSelect={true}
              placeholder={
                Users.length !== 0
                  ? Users.toString()
                  : strings("offerSummary.nothing_selected")
              }
              valueField={"name"}
              style={styles.dropdownRow}
              placeholderTextColor={Colors.black}
            />

            <Text style={styles.bottomText}>
              {strings(
                "offerSummary.lateralEntry.please_select_user_from_list"
              )}
            </Text>
          </View>
        )}

        <PinkButton
          onPress={() => onCreateOffer()}
          style={styles.dbuttonStyle}
          text={"small"}
          name={strings("offerSummary.create_offer")}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  inputName: {
    ...commonFontStyle(500, 16, Colors.pink),
    // marginTop: hp(4),
    textAlign: "left",
  },
  textInput: {
    ...commonFontStyle(400, 14, Colors.black),
    backgroundColor: Colors.white,
    marginBottom: hp(2),
    width: "100%",
    // height: hp(6),
    height: hp(23),
    padding: hp(2),
    borderRadius: 5,
    marginVertical: hp(2),
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  bottomText: {
    ...commonFontStyle(400, 14, Colors.darkGrey),
    marginTop: -hp(1),
    textAlign: "left",
  },
  placeholderStyle: {
    ...commonFontStyle(400, 14, Colors.darkGrey),
  },
  placeholderSelectedStyle: {
    ...commonFontStyle(400, 14, Colors.black),
  },
  TitleTextStyle: {
    ...commonFontStyle(400, 14, Colors.black),
  },
  tradetypeviewStyle: {
    backgroundColor: Colors.white,
    marginBottom: hp(2),
    width: "100%",
    height: hp(6),
    paddingHorizontal: hp(2),
    borderRadius: 5,
    marginTop: hp(2),
  },
  textItem: {
    ...commonFontStyle(400, 14, Colors.black),
  },
  dbuttonStyle: {
    marginTop: hp(8),
  },
  buttonTextStyle: {
    ...commonFontStyle(400, 16, Colors.white),
  },
  selectedItemsDropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: hp(1),
    paddingHorizontal: hp(3),
    alignItems: "center",
  },
  tickIcon: {
    resizeMode: "contain",
    height: 12,
    width: 12,
  },
});
