import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import RegistrationTextInput from "../../Components/RegistrationTextInput";
import PinkButton from "../../Components/PinkButton";
import MenuScreenItems from "../../Components/MenuScreenItems";
export default function M_MenuScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [name, setname] = useState("");
  const [nameArabic, setnameArabic] = useState("");
  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>Menu Categories</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {[0, 1, 2, 3].map((element, index) => {
            return <MenuScreenItems activeVisible={false} />;
          })}
        </ScrollView>
        <View style={styles.rowView}>
          <Text style={styles.title}>Add Menu Categories</Text>
          <Text style={styles.title2}>Menu Categories Details</Text>
          <View>
            <Text style={styles.titleInput}>Name</Text>
            <RegistrationTextInput
              placeholder={"Enter name"}
              value={name}
              onChangeText={(text) => setname(text)}
            />
          </View>
          <View>
            <Text style={styles.titleInput}>Name in Arabic</Text>
            <RegistrationTextInput
              placeholder={"Enter name in Arabic"}
              value={nameArabic}
              onChangeText={(text) => setnameArabic(text)}
            />
          </View>

          <PinkButton
            text={"small"}
            onPress={() => {}}
            style={styles.dbuttonStyle}
            name={"Add Categories"}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  welcomeText: {
    ...commonFontStyle(400, 18, Colors.pink),
    marginTop: 5,
    marginBottom: hp(3),
    textAlign: "center",
  },

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
