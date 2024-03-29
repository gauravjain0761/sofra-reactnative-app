import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  I18nManager,
} from "react-native";
import React, { useEffect, useState } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle, SCREEN_WIDTH } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import { Dropdown } from "react-native-element-dropdown";
import PinkButton from "../../Components/PinkButton";
import MenuScreenItems from "../../Components/MenuScreenItems";
import RegistrationTextInput from "../../Components/RegistrationTextInput";
import GrayButton from "../../Components/GrayButton";
import { useDispatch, useSelector } from "react-redux";
import {
  AddPromoCode,
  changePromoCodeStatus,
  getPromoCodes,
} from "../../Services/MerchantApi";
import {
  dispatchErrorAction,
  getFromDataJson,
  hasArabicCharacters,
} from "../../Services/CommonFunctions";
import {
  discountType,
  ExpiryTypeData,
  offerUserData,
  VendorsValidityData,
} from "../../Config/StaticDropdownData";
import ImagePicker from "react-native-image-crop-picker";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePickerView from "../../Components/DateTimePickerView";
import { strings } from "../../Config/I18n";
import { getLanguage } from "../../Services/asyncStorage";
const citydata = [
  {
    id: 1,
    strategicName: "SUPERTREND",
  },
  { id: 2, strategicName: "VWAP" },
  { id: 3, strategicName: "RSIMA" },
  { id: 6, strategicName: "TESTING" },
  { id: 10, strategicName: "DEMATADE" },
];
export default function M_PromocodeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [title, settitle] = useState("");
  const [arabicTitle, setarabicTitle] = useState("");
  const [discountCode, setdiscountCode] = useState("");
  const [des, setdes] = useState("");
  const [Arabicdes, setArabicdes] = useState("");
  const [price, setprice] = useState(strings("promo_code.price"));
  const [discountValue, setdiscountValue] = useState("");
  const [maxDiscount, setmaxDiscount] = useState("");
  const [minOrderValue, setminOrderValue] = useState("");
  const [validityType, setvalidityType] = useState("ALL");
  const [expiryType, setexpiryType] = useState("NO");
  const [image, setimage] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [count, setcount] = useState("");
  const PROMO_CODES = useSelector((e) => e.merchant.promocodes);
  const [Users, setUsers] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateType, setdateType] = useState([]);
  const USERS = useSelector((e) => e.merchant.users);
  const [lan, setlan] = useState("en");
  useEffect(async () => {
    let lang = await getLanguage();
    setlan(lang);
  }, []);
  useEffect(() => {
    dispatch({ type: "PRE_LOADER", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getPromoCodes());
    });
    // dispatch(getPromoCodes());
  }, []);
  const openPicker = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      includeBase64: true,
    }).then((photo) => {
      if (Platform.OS == "android") {
        photo.sourceURL = photo.path;
      }
      setimage(photo);
    });
  };
  const addPromoCode = () => {
    let userIdJson = getFromDataJson(USERS, Users, "users");
    let data = {
      title: title,
      title_ar: arabicTitle,
      type: validityType,
      description: des,
      description_ar: Arabicdes,
      vendorsValidity: "SPECIFIC",
      image: image.sourceURL
        ? {
            uri: image.sourceURL,
            type: image.mime, // or photo.type image/jpg
            name:
              "image_" +
              moment().unix() +
              "_" +
              image.sourceURL.split("/").pop(),
          }
        : undefined,
      discountType: price,
      code: discountCode !== "" ? discountCode.toUpperCase() : undefined,
      expiryType: expiryType,
      startDate:
        StartDate !== "" ? moment(StartDate).format("YYYY-MM-DD") : undefined,
      endDate:
        EndDate !== "" ? moment(EndDate).format("YYYY-MM-DD") : undefined,
      discountValue: discountValue !== "" ? Number(discountValue) : "",
      maxDiscountPrice: maxDiscount !== "" ? Number(maxDiscount) : "",
      minimumOrderValue: minOrderValue !== "" ? Number(minOrderValue) : "",
      count: count !== "" ? Number(count) : undefined,
      ...userIdJson,
    };
    dispatch(
      AddPromoCode(data, () => {
        settitle("");
        setarabicTitle("");
        setdiscountCode("");
        setdes("");
        setArabicdes("");
        setprice(strings("promo_code.price"));
        setdiscountValue("");
        setmaxDiscount("");
        setminOrderValue("");
        setvalidityType("ALL");
        setexpiryType("NO");
        setimage("");
        setStartDate("");
        setEndDate("");
        setcount("");
      })
    );
  };

  const checkExpiryTypeValidation = () => {
    if (expiryType == "DATE") {
      if (StartDate !== "" && EndDate !== "") {
        addPromoCode();
      } else {
        dispatchErrorAction(
          dispatch,
          strings("validationString.Please_select_start_and_end_date")
        );
      }
    } else if (expiryType == "COUNT") {
      if (count !== "") {
        addPromoCode();
      } else {
        dispatchErrorAction(
          dispatch,
          strings("validationString.Please_enter_count")
        );
      }
    } else {
      addPromoCode();
    }
  };
  const validation = () => {
    if (title.trim() !== "") {
      if (arabicTitle.trim() !== "") {
        if (des.trim() !== "") {
          if (Arabicdes.trim() !== "") {
            if (validityType == "USERS") {
              if (Users.length !== 0) {
                checkExpiryTypeValidation();
              } else {
                dispatchErrorAction(
                  dispatch,
                  strings("validationString.Please_select_users")
                );
              }
            } else {
              checkExpiryTypeValidation();
            }
          } else {
            dispatchErrorAction(
              dispatch,
              strings("validationString.please_enter_description_in_arabic")
            );
          }
        } else {
          dispatchErrorAction(
            dispatch,
            strings("validationString.please enter_description")
          );
        }
      } else {
        dispatchErrorAction(
          dispatch,
          strings("validationString.please_enter_title_in_arabic")
        );
      }
    } else {
      dispatchErrorAction(
        dispatch,
        strings("validationString.please_enter_title")
      );
    }
  };
  const handleConfirm = (date) => {
    if (dateType == "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    setDatePickerVisibility(false);
  };
  const onChangeStatus = async (id, status) => {
    let data = { codeId: id, status: status == 1 ? 0 : 1, language: lan };
    dispatch(changePromoCodeStatus(data));
  };

  const renderItem = ({ item, index }) => (
    <MenuScreenItems
      item={item}
      onEdit={() =>
        navigation.navigate("M_EditPromocodeScreen", {
          params: item,
        })
      }
      onChangeStatus={() =>
        onChangeStatus(item.id, item.status == "ACTIVE" ? 1 : 0)
      }
      status={item.status == "ACTIVE" ? 1 : 0}
      activeVisible={true}
      screen={"promocode"}
    />
  );

  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={ApplicationStyles.welcomeText}>
          {strings("promo_code.promo_codes")}
        </Text>
        {PROMO_CODES.length !== 0 && (
          <FlatList
            style={{ flexDirection: I18nManager.isRTL ? "row-reverse" : "row" }}
            horizontal={true}
            data={PROMO_CODES}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        )}
        <View>
          <Text style={styles.title2}>
            {strings("promo_code.promo_code_details_here")}
          </Text>
          <View>
            <View style={styles.row}>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <RegistrationTextInput
                  placeholder={strings("promo_code.title")}
                  value={title}
                  onChangeText={(text) => settitle(text)}
                />
              </View>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <RegistrationTextInput
                  placeholder={strings("promo_code.title_in_arabic")}
                  value={arabicTitle}
                  onChangeText={(text) => setarabicTitle(text)}
                />
              </View>
            </View>
            <RegistrationTextInput
              placeholder={strings("promo_code.discount_code")}
              value={discountCode}
              onChangeText={(text) => setdiscountCode(text)}
            />
            <View>
              <TextInput
                value={des}
                onChangeText={(text) => setdes(text)}
                multiline={true}
                style={[
                  styles.textInput,
                  { textAlign: I18nManager.isRTL ? "right" : "left" },
                ]}
                placeholder={strings("promo_code.description")}
                placeholderTextColor={Colors.placeholderColor}
                textAlignVertical={"top"}
              />
              <TextInput
                value={Arabicdes}
                onChangeText={(text) => setArabicdes(text)}
                multiline={true}
                style={[
                  styles.textInput,
                  { textAlign: I18nManager.isRTL ? "right" : "left" },
                ]}
                placeholder={strings("promo_code.descripition_in_arabic")}
                placeholderTextColor={Colors.placeholderColor}
                textAlignVertical={"top"}
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.title22}>
            {strings("promo_code.discount_type")}
          </Text>
          <View>
            <RegistrationDropdown
              data={discountType}
              value={price}
              setData={(text) => {
                setprice(text);
              }}
              placeholder={
                price !== "" ? price : strings("promo_code.discount_type")
              }
              valueField={"name"}
              labelField={lan == "en" ? "label" : "name_ar"}
              placeholderTextColor={Colors.black}
            />
            <RegistrationTextInput
              keyboardType={"numeric"}
              placeholder={strings("promo_code.discount_value")}
              value={discountValue}
              onChangeText={(text) => setdiscountValue(text)}
            />
            <RegistrationTextInput
              keyboardType={"numeric"}
              placeholder={strings("promo_code.maximum_discount_amount")}
              value={maxDiscount}
              onChangeText={(text) => setmaxDiscount(text)}
            />
            <RegistrationTextInput
              keyboardType={"numeric"}
              placeholder={strings("promo_code.maximum_discount_value")}
              value={minOrderValue}
              onChangeText={(text) => setminOrderValue(text)}
            />
          </View>
        </View>
        <View>
          <Text style={styles.title22}>{`${strings(
            "promo_code.validity_type"
          )}*`}</Text>
          <RegistrationDropdown
            data={VendorsValidityData}
            value={validityType}
            setData={(text) => {
              setvalidityType(text);
            }}
            placeholder={
              validityType !== "" ? validityType : strings("promo_code.type")
            }
            valueField={"name"}
            labelField={lan == "en" ? "label" : "name_ar"}
            placeholderTextColor={Colors.black}
          />
          {validityType == "USERS" && (
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
                  : strings("promo_code.lateralEntry.select_user")
              }
              valueField={"name"}
              style={styles.dropdownRow}
              placeholderTextColor={Colors.black}
            />
          )}
        </View>
        <View>
          <Text style={styles.title22}>{`${strings(
            "promo_code.expiry_type"
          )}*`}</Text>
          <RegistrationDropdown
            data={ExpiryTypeData}
            value={expiryType}
            setData={(text) => {
              setexpiryType(text);
            }}
            placeholder={strings("promo_code.type")}
            valueField={"name"}
            labelField={lan == "en" ? "label" : "name_ar"}
            placeholderTextColor={Colors.black}
          />
          {expiryType == "DATE" && (
            <View style={styles.row}>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <DateTimePickerView
                  value={StartDate}
                  format={"MM/DD/YYYY"}
                  placeHolder={strings("promo_code.lateralEntry.start_date")}
                  onPressPicker={() => {
                    setDatePickerVisibility(true), setdateType("start");
                  }}
                  width={"100%"}
                />
              </View>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <DateTimePickerView
                  value={EndDate}
                  format={"MM/DD/YYYY"}
                  placeHolder={strings("promo_code.lateralEntry.end_date")}
                  onPressPicker={() => {
                    setDatePickerVisibility(true), setdateType("end");
                  }}
                  width={"100%"}
                />
              </View>
            </View>
          )}
          {expiryType == "COUNT" && (
            <RegistrationTextInput
              keyboardType={"numeric"}
              placeholder={strings(
                "promo_code.lateralEntry.enter_discount_code_expire_count"
              )}
              value={count}
              onChangeText={(text) => setcount(text)}
            />
          )}
        </View>
        <View>
          <Text style={styles.title22}>{strings("promo_code.image")}</Text>
          <TouchableOpacity
            onPress={() => openPicker()}
            style={styles.imageView}
          >
            {image == "" ? (
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../../Images/Merchant/xxxhdpi/ic_attach.png")}
                  style={styles.imageVector}
                />
                <Text style={styles.attachText}>
                  {strings("profile.attach_image")}
                </Text>
              </View>
            ) : (
              <View>
                <Image
                  source={{
                    uri: `data:image/jpeg;base64,${image.data}`,
                  }}
                  style={styles.image}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <View style={styles.row}>
            <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
              <PinkButton
                onPress={() => {
                  validation();
                }}
                text={"small"}
                name={strings("promo_code.save")}
              />
            </View>
            <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
              <GrayButton
                onPress={() => {}}
                style={styles.dbuttonStyle}
                text={"small"}
                name={strings("promo_code.cancel")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  title2: {
    ...commonFontStyle(500, 16, Colors.pink),
    marginBottom: hp(2),
    textAlign: "left",
  },
  title22: {
    ...commonFontStyle(400, 17, Colors.pink),
    marginBottom: hp(3),
    marginTop: hp(1),
    textAlign: "left",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
  textInput: {
    ...commonFontStyle(400, 14, Colors.black),
    backgroundColor: Colors.white,
    marginBottom: hp(2),
    width: "100%",
    height: hp(12),
    padding: hp(2),
    borderRadius: 5,
  },
  buttonRow: {
    marginVertical: hp(3),
    marginBottom: hp(5),
  },
  imageView: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: hp(17),
    borderColor: Colors.placeholderColor,
    borderWidth: 1,
    borderStyle: "dashed",
    marginBottom: hp(2),
    overflow: "hidden",
  },
  imageVector: {
    width: hp(6),
    // height: hp(6),
    height: hp(6),
    resizeMode: "contain",
  },
  image: {
    height: hp(17),
    resizeMode: "cover",
    width: SCREEN_WIDTH - hp(4),
  },
  attachText: {
    ...commonFontStyle(400, 12, Colors.darkGrey),
    marginTop: hp(1),
  },
});
