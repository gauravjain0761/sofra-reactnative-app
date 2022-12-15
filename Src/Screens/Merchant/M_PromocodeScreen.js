import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
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
import { AddPromoCode, getPromoCodes } from "../../Services/MerchantApi";
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
  const [businessArabic, setbusinessArabic] = useState("");
  const [des, setdes] = useState("");
  const [Arabicdes, setArabicdes] = useState("");
  const [price, setprice] = useState("PRICE");
  const [discountValue, setdiscountValue] = useState("");
  const [maxDiscount, setmaxDiscount] = useState("");
  const [minOrderValue, setminOrderValue] = useState("");
  const [validityType, setvalidityType] = useState("ALL");
  const [expiryType, setexpiryType] = useState("NO_LIMIT");
  const [image, setimage] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [count, setcount] = useState("");
  const PROMO_CODES = useSelector((e) => e.merchant.promocodes);
  const [Users, setUsers] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateType, setdateType] = useState([]);
  const USERS = useSelector((e) => e.merchant.users);
  useEffect(() => {
    // dispatch(getPromoCodes());
  }, []);
  const openPicker = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      includeBase64: true,
    }).then((photo) => {
      setimage(photo);
    });
  };
  const addPromoCode = () => {
    let userIdJson = getFromDataJson(USERS, Users, "userIds");
    let data = {
      title: title,
      title_ar: arabicTitle,
      vendorsValidity: validityType,
      description: des,
      description_ar: Arabicdes,
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
      type: "",
      code: discountCode !== "" ? discountCode.toUpperCase() : undefined,
      expiryType: expiryType,
      startDate:
        StartDate !== "" ? moment(StartDate).format("YYYY-MM-DD") : undefined,
      endDate:
        EndDate !== "" ? moment(EndDate).format("YYYY-MM-DD") : undefined,
      discountValue: discountValue,
      maxDiscountPrice: maxDiscount,
      minimumOrderValue: minOrderValue,
      count: count !== "" ? count : undefined,
      ...userIdJson,
    };
    dispatch(AddPromoCode(data));
    console.log(data);
  };

  const validation = () => {
    if (title.trim() !== "") {
      if (hasArabicCharacters(arabicTitle)) {
        if (des.trim() !== "") {
          if (Arabicdes.trim() !== "") {
            if (
              discountValue.trim() !== "" &&
              Number.isInteger(discountValue)
            ) {
              if (maxDiscount.trim() !== "" && Number.isInteger(maxDiscount)) {
                if (
                  minOrderValue.trim() !== "" &&
                  Number.isInteger(minOrderValue)
                ) {
                  if (validityType.trim() !== "") {
                    if (expiryType.trim() !== "") {
                      if (image.trim() !== "") {
                      } else {
                        dispatchErrorAction(dispatch, "Please select image");
                      }
                    } else {
                      dispatchErrorAction(
                        dispatch,
                        "Please select expiry type"
                      );
                    }
                  } else {
                    dispatchErrorAction(
                      dispatch,
                      "Please select validity type"
                    );
                  }
                } else {
                  dispatchErrorAction(
                    dispatch,
                    "Please enter minimum order value"
                  );
                }
              } else {
                dispatchErrorAction(
                  dispatch,
                  "Please enter maximum discount amount"
                );
              }
            } else {
              dispatchErrorAction(dispatch, "Please enter discount value");
            }
          } else {
            dispatchErrorAction(dispatch, "Please enter description in arabic");
          }
        } else {
          dispatchErrorAction(dispatch, "Please enter description");
        }
      } else {
        dispatchErrorAction(dispatch, "Please enter title in arabic");
      }
    } else {
      dispatchErrorAction(dispatch, "Please enter title");
    }
  };
  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    if (dateType == "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    setDatePickerVisibility(false);
  };

  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={ApplicationStyles.welcomeText}>Promo Codes</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {PROMO_CODES.length !== 0 &&
            PROMO_CODES.map((element, index) => {
              return (
                <MenuScreenItems
                  onEdit={() =>
                    navigation.navigate("M_EditPromocodeScreen", {
                      params: element,
                    })
                  }
                  activeVisible={false}
                  screen={"promocode"}
                />
              );
            })}
        </ScrollView>
        <View>
          <Text style={styles.title2}>Promo code details here:</Text>
          <View>
            <View style={styles.row}>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <RegistrationTextInput
                  placeholder={"Title"}
                  value={title}
                  onChangeText={(text) => settitle(text)}
                />
              </View>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <RegistrationTextInput
                  placeholder={"Title in arabic"}
                  value={arabicTitle}
                  onChangeText={(text) => setarabicTitle(text)}
                />
              </View>
            </View>
            <RegistrationTextInput
              placeholder={"Discount code"}
              value={discountCode}
              onChangeText={(text) => setdiscountCode(text)}
            />
            <View>
              <TextInput
                value={des}
                onChangeText={(text) => setdes(text)}
                multiline={true}
                style={styles.textInput}
                placeholder={"Description"}
                placeholderTextColor={Colors.placeholderColor}
                textAlignVertical={"top"}
              />
              <TextInput
                value={Arabicdes}
                onChangeText={(text) => setArabicdes(text)}
                multiline={true}
                style={styles.textInput}
                placeholder={"Description in arabic"}
                placeholderTextColor={Colors.placeholderColor}
                textAlignVertical={"top"}
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.title22}>Discount Type</Text>
          <View>
            <RegistrationDropdown
              data={discountType}
              value={price}
              setData={(text) => {
                setprice(text);
              }}
              placeholder={price !== "" ? price : "Discount Type"}
              valueField={"name"}
              labelField={"label"}
              placeholderTextColor={Colors.black}
            />
            <RegistrationTextInput
              keyboardType={"numeric"}
              placeholder={"Discount Value"}
              value={discountValue}
              onChangeText={(text) => setdiscountValue(text)}
            />
            <RegistrationTextInput
              keyboardType={"numeric"}
              placeholder={"Maximum Discount Amount"}
              value={maxDiscount}
              onChangeText={(text) => setmaxDiscount(text)}
            />
            <RegistrationTextInput
              keyboardType={"numeric"}
              placeholder={"Minimum Order Value"}
              value={minOrderValue}
              onChangeText={(text) => setminOrderValue(text)}
            />
          </View>
        </View>
        <View>
          <Text style={styles.title22}>Validity Type*</Text>
          <RegistrationDropdown
            data={offerUserData}
            value={validityType}
            setData={(text) => {
              setvalidityType(text);
            }}
            placeholder={validityType !== "" ? validityType : "Type"}
            valueField={"name"}
            labelField={"label"}
            placeholderTextColor={Colors.black}
          />
          {validityType == "SPECIFIC" && (
            <RegistrationDropdown
              data={USERS}
              value={Users}
              setData={(text) => {
                setUsers(text);
              }}
              multiSelect={true}
              placeholder={
                Users.length !== 0 ? Users.toString() : "Select Users"
              }
              valueField={"name"}
              style={styles.dropdownRow}
              placeholderTextColor={Colors.black}
            />
          )}
        </View>
        <View>
          <Text style={styles.title22}>Expiry Type*</Text>
          <RegistrationDropdown
            data={ExpiryTypeData}
            value={expiryType}
            setData={(text) => {
              setexpiryType(text);
            }}
            placeholder={"Type"}
            valueField={"name"}
            labelField={"label"}
            placeholderTextColor={Colors.black}
          />
          {expiryType == "DATE" && (
            <View style={styles.row}>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <RegistrationTextInput
                  onFocus={() => {
                    setDatePickerVisibility(true), setdateType("start");
                  }}
                  placeholder={"Start date"}
                  value={moment(StartDate).format("MM/DD/YYYY")}
                  onChangeText={(text) => setStartDate(text)}
                />
              </View>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <RegistrationTextInput
                  onFocus={() => {
                    setDatePickerVisibility(true), setdateType("end");
                  }}
                  placeholder={"End date"}
                  value={moment(EndDate).format("MM/DD/YYYY")}
                  onChangeText={(text) => setEndDate(text)}
                />
              </View>
            </View>
          )}
          {expiryType == "NO" && (
            <RegistrationTextInput
              keyboardType={"numeric"}
              placeholder={"Enter the discount code expire count"}
              value={count}
              onChangeText={(text) => setcount(text)}
            />
          )}
        </View>
        <View>
          <Text style={styles.title22}>Image</Text>
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
                <Text style={styles.attachText}>Attach Image</Text>
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
                  addPromoCode();
                }}
                text={"small"}
                name={"Save"}
              />
            </View>
            <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
              <GrayButton
                onPress={() => {}}
                style={styles.dbuttonStyle}
                text={"small"}
                name={"Cancel"}
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
  },
  title22: {
    ...commonFontStyle(400, 17, Colors.pink),
    marginBottom: hp(3),
    marginTop: hp(1),
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
