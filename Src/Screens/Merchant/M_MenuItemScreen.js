import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle, SCREEN_WIDTH } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import RegistrationTextInput from "../../Components/RegistrationTextInput";
import PinkButton from "../../Components/PinkButton";
import MenuScreenItems from "../../Components/MenuScreenItems";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchErrorAction,
  hasArabicCharacters,
} from "../../Services/CommonFunctions";
import { getMenuItems } from "../../Services/MerchantApi";

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
export default function M_MenuItemScreen({ navigation }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [Name, setName] = useState("");
  const [ArabicName, setArabicName] = useState("");
  const [MenuCategory, setMenuCategory] = useState("");
  const [ItemType, setItemType] = useState("");
  const [Price, setPrice] = useState("");
  const [Discount, setDiscount] = useState("");
  const [MaxLimit, setMaxLimit] = useState("");
  const [ImageItem, setImageItem] = useState("");
  const [Description, setDescription] = useState("");
  const [ArabicDes, setArabicDes] = useState("");
  const [MenuDes, setMenuDes] = useState("");
  const MENU_ITEMS = useSelector((e) => e.merchant.menuItems);
  useEffect(() => {
    dispatch(getMenuItems());
  }, []);
  const openPicker = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      includeBase64: true,
    }).then((photo) => {
      setImageItem(photo);
    });
  };

  const onAddMenuItem = () => {
    if (Name.trim() !== "") {
      // if (hasArabicCharacters(ArabicName)) {
      if (MenuCategory.trim() !== "") {
        if (ItemType.trim() !== "") {
          if (Price.trim() !== "") {
            if (Discount.trim() !== "") {
              if (MaxLimit.trim() !== "") {
                if (ImageItem !== "") {
                  if (Description.trim() !== "") {
                    if (hasArabicCharacters(ArabicDes)) {
                      if (MenuDes.trim() !== "") {
                      } else {
                        dispatchErrorAction(
                          dispatch,
                          "Please select menu descriptors"
                        );
                      }
                    } else {
                      dispatchErrorAction(
                        dispatch,
                        "Please enter Description in arabic"
                      );
                    }
                  } else {
                    dispatchErrorAction(dispatch, "Please enter Description");
                  }
                } else {
                  dispatchErrorAction(dispatch, "Please select item image");
                }
              } else {
                dispatchErrorAction(dispatch, "Please enter max limit");
              }
            } else {
              dispatchErrorAction(dispatch, "Please select Discount");
            }
          } else {
            dispatchErrorAction(dispatch, "Please enter price");
          }
        } else {
          dispatchErrorAction(dispatch, "Please select item type");
        }
      } else {
        dispatchErrorAction(dispatch, "Please select menu categories");
      }
      // } else {
      //   dispatchErrorAction(dispatch, "Please enter name in arabic");
      // }
    } else {
      dispatchErrorAction(dispatch, "Please enter name");
    }
  };
  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={ApplicationStyles.welcomeText}>Menu Items</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {MENU_ITEMS.length !== 0 &&
            MENU_ITEMS.map((element, index) => {
              return (
                <MenuScreenItems
                  onEdit={() =>
                    navigation.navigate("M_EditMenuItemScreen", element)
                  }
                  item={element}
                  screen={"item"}
                  activeVisible={true}
                />
              );
            })}
        </ScrollView>
        <View style={styles.rowView}>
          <Text style={styles.title}>Add Menu Items</Text>
          <Text style={styles.title2}>Menu items details</Text>
          <View>
            <Text style={styles.titleInput}>Name</Text>
            <RegistrationTextInput
              placeholder={"Enter name"}
              value={Name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={Colors.black}
            />
          </View>
          <View>
            <Text style={styles.titleInput}>Name in Arabic</Text>
            <RegistrationTextInput
              placeholder={"Enter name in Arabic"}
              value={ArabicName}
              onChangeText={(text) => setArabicName(text)}
              placeholderTextColor={Colors.black}
            />
          </View>
          <View style={styles.row}>
            <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
              <Text style={styles.titleInput}>Menu Categories</Text>
              <RegistrationDropdown
                data={citydata}
                value={MenuCategory}
                setData={(text) => {
                  setMenuCategory(text);
                }}
                placeholder={"Categories"}
                valueField={"strategicName"}
                style={styles.dropdownRow}
                placeholderTextColor={Colors.black}
              />
            </View>
            <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
              <Text style={styles.titleInput}>Item Type</Text>
              <RegistrationDropdown
                data={citydata}
                value={ItemType}
                setData={(text) => {
                  setItemType(text);
                }}
                placeholder={"Type"}
                valueField={"strategicName"}
                style={styles.dropdownRow}
                placeholderTextColor={Colors.black}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
              <Text style={styles.titleInput}>Price in AED</Text>
              <RegistrationTextInput
                keyboardType={"numeric"}
                placeholder={"Enter Price"}
                value={Price}
                onChangeText={(text) => setPrice(text)}
                placeholderTextColor={Colors.black}
              />
            </View>
            <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
              <Text style={styles.titleInput}>Discount</Text>
              <RegistrationDropdown
                data={citydata}
                value={Discount}
                setData={(text) => {
                  setDiscount(text);
                }}
                placeholder={"Discount"}
                valueField={"strategicName"}
                style={styles.dropdownRow}
                placeholderTextColor={Colors.black}
              />
            </View>
          </View>
          <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
            <Text style={styles.titleInput}>Max Limit</Text>
            <RegistrationTextInput
              placeholder={"Enter Price"}
              value={MaxLimit}
              keyboardType={"numeric"}
              onChangeText={(text) => setMaxLimit(text)}
              placeholderTextColor={Colors.black}
            />
          </View>
          <View>
            <Text style={styles.titleInput}>Images</Text>
            <TouchableOpacity
              onPress={() => openPicker()}
              style={styles.imageView}
            >
              {ImageItem == "" ? (
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
                      uri: `data:image/jpeg;base64,${ImageItem.data}`,
                    }}
                    style={styles.image}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.titleInput}>Description</Text>
            <TextInput
              value={Description}
              onChangeText={(text) => setDescription(text)}
              multiline={true}
              style={styles.textInput}
              placeholder={"Description"}
              placeholderTextColor={Colors.black}
              textAlignVertical={"top"}
            />
          </View>
          <View>
            <Text style={styles.titleInput}>Description in Arabic</Text>
            <TextInput
              value={ArabicDes}
              onChangeText={(text) => setArabicDes(text)}
              multiline={true}
              style={styles.textInput}
              placeholder={"Description"}
              placeholderTextColor={Colors.black}
              textAlignVertical={"top"}
            />
          </View>
          <View>
            <Text style={styles.titleInput}>Menu Descriptors</Text>
            <RegistrationDropdown
              data={citydata}
              value={MenuDes}
              setData={(text) => {
                setMenuDes(text);
              }}
              placeholder={"Menu Descriptors"}
              valueField={"strategicName"}
              style={styles.dropdownRow}
              placeholderTextColor={Colors.black}
            />
          </View>

          <PinkButton
            text={"small"}
            onPress={() => onAddMenuItem()}
            style={styles.dbuttonStyle}
            name={"Submit"}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    ...commonFontStyle(600, 18, Colors.black),

    marginBottom: hp(1.5),
  },
  title2: { ...commonFontStyle(500, 16, Colors.pink), marginBottom: hp(3) },
  titleInput: {
    ...commonFontStyle(500, 14, Colors.pink),
    marginBottom: 10,
    marginTop: 5,
  },
  dbuttonStyle: {
    marginVertical: hp(3),
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
    // height: hp(6),
    height: hp(12),
    padding: hp(2),
    borderRadius: 5,
    // marginVertical: hp(2),
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
