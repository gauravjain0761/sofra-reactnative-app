import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import RegistrationTextInput from "../../Components/RegistrationTextInput";
import PinkButton from "../../Components/PinkButton";
import MenuScreenItems from "../../Components/MenuScreenItems";
import {
  dispatchErrorAction,
  hasArabicCharacters,
} from "../../Services/CommonFunctions";
import { useDispatch } from "react-redux";
import { EditMenuCategory } from "../../Services/MerchantApi";
import { strings } from "../../Config/I18n";
import { getLanguage } from "../../Services/asyncStorage";

export default function M_EditCategoryScreen({ navigation, route }) {
  const category = route?.params;
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [name, setname] = useState(category ? category.name : "");
  const [nameArabic, setnameArabic] = useState(
    category ? category.name_ar : ""
  );
  const [Language, setLanguage] = useState("en");
  useEffect(() => {
    async function setLang() {
      let lang = await getLanguage();
      setLanguage(lang);
    }
    setLang();
  }, []);
  const onEditCategory = () => {
    let data = {
      name: name,
      name_ar: nameArabic,
      categoryId: category.id,
      language: Language,
    };
    dispatch(EditMenuCategory(data, navigation));
  };

  const validation = () => {
    if (name.trim() !== "") {
      if (nameArabic.trim() !== "") {
        onEditCategory();
      } else {
        dispatchErrorAction(
          dispatch,
          strings("validationString.please_enter_name_in_arabic")
        );
      }
    } else {
      dispatchErrorAction(
        dispatch,
        strings("validationString.please_enter_category_name")
      );
    }
  };
  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={ApplicationStyles.welcomeText}>
          {strings("editCategories.edit_manu_categories")}
        </Text>

        <View style={styles.rowView}>
          {/* <Text style={styles.title}>Add Menu Categories</Text>
          <Text style={styles.title2}>Menu Categories Details</Text> */}
          <View>
            <Text style={styles.titleInput}>{strings("menu_screen.name")}</Text>
            <RegistrationTextInput
              placeholder={strings("menu_screen.enter_name")}
              value={name}
              onChangeText={(text) => setname(text)}
            />
          </View>
          <View>
            <Text style={styles.titleInput}>
              {strings("menu_screen.name_in_arabic")}
            </Text>
            <RegistrationTextInput
              placeholder={strings("menu_screen.enter_name_in_arabic")}
              value={nameArabic}
              onChangeText={(text) => setnameArabic(text)}
            />
          </View>

          <PinkButton
            text={"small"}
            onPress={() => validation()}
            style={styles.dbuttonStyle}
            name={strings("editCategories.update_categories")}
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
    ...commonFontStyle(500, 14, Colors.black),
    marginBottom: 10,
  },
  dbuttonStyle: {
    marginVertical: hp(3),
  },
});
