// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import React, { useState } from "react";
// import ApplicationStyles from "../Themes/ApplicationStyles";
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP,
// } from "react-native-responsive-screen";
// import { commonFontStyle } from "../Themes/Fonts";
// import Colors from "../Themes/Colors";
// import RegistrationTextInput from "../Components/RegistrationTextInput";
// import PinkButton from "../Components/PinkButton";

// export default function MenuScreenItems({ activeVisible }) {
//   return (
//     <View style={styles.cardView}>
//       <Image
//         style={styles.menuImage}
//         source={require("../Images/Merchant/xxxhdpi/foodDish.jpeg")}
//       />
//       <Text style={styles.addText}>New Royal Place Restaurant</Text>
//       <View style={styles.cardBotomBtn}>
//         <TouchableOpacity style={styles.addMenuButton}>
//           <Image
//             style={styles.menuIconButton}
//             source={require("../Images/Merchant/xxxhdpi/ic_check.png")}
//           />
//           <Text style={styles.addButton}>Edit</Text>
//         </TouchableOpacity>
//         {activeVisible == true && (
//           <TouchableOpacity
//             style={[
//               styles.addMenuButton,
//               {
//                 marginLeft: hp(2),
//                 backgroundColor: Colors.green,
//                 // opacity: 0,
//               },
//             ]}
//           >
//             <Image
//               style={styles.menuIconButton}
//               source={require("../Images/Merchant/xxxhdpi/ic_check.png")}
//             />
//             <Text style={styles.addButton}>Active</Text>
//           </TouchableOpacity>
//         )}
//         <TouchableOpacity
//           style={[
//             styles.addMenuButton,
//             {
//               marginLeft: hp(2),
//               backgroundColor: Colors.grayButtonBackground,
//             },
//           ]}
//         >
//           <Image
//             style={styles.menuIconButton}
//             source={require("../Images/Merchant/xxxhdpi/ic_check.png")}
//           />
//           <Text style={styles.addButton}>Delete</Text>
//         </TouchableOpacity>
//         {!activeVisible && (
//           <View style={{ opacity: 0 }}>
//             <TouchableOpacity
//               style={[
//                 styles.addMenuButton,
//                 {
//                   marginLeft: hp(2),
//                   backgroundColor: Colors.green,
//                 },
//               ]}
//             >
//               <Image
//                 style={styles.menuIconButton}
//                 source={require("../Images/Merchant/xxxhdpi/ic_check.png")}
//               />
//               <Text style={styles.addButton}>Active</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   cardView: {
//     borderRadius: 15,
//     backgroundColor: Colors.white,
//     overflow: "hidden",
//     marginRight: hp(2),
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.05,
//     shadowRadius: 6.27,
//     width: widthPercentageToDP(75),
//     elevation: 5,
//     marginBottom: hp(3),
//   },

//   addText: {
//     ...commonFontStyle(500, 14, Colors.black),
//     marginHorizontal: hp(2),
//   },
//   addButton: {
//     ...commonFontStyle(500, 13, Colors.white),
//   },
//   addMenuButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: hp(1.5),
//     paddingVertical: hp(1.5),
//     backgroundColor: Colors.pink,
//     marginTop: hp(2),
//     borderRadius: 5,
//   },
//   menuImage: {
//     marginBottom: hp(1.5),
//     height: hp(22),
//     width: widthPercentageToDP(75),
//     resizeMode: "cover",
//   },
//   cardBotomBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: hp(2),
//     marginBottom: hp(2.5),
//   },
//   menuIconButton: {
//     height: hp(2),
//     width: hp(2),
//     resizeMode: "contain",
//     tintColor: Colors.white,
//     marginRight: 5,
//   },
// });

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
import ApplicationStyles from "../Themes/ApplicationStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { commonFontStyle } from "../Themes/Fonts";
import Colors from "../Themes/Colors";
import RegistrationTextInput from "../Components/RegistrationTextInput";
import PinkButton from "../Components/PinkButton";
import { useNavigation } from "@react-navigation/native";

export default function MenuScreenItems({ activeVisible, screen }) {
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
          source={require("../Images/Merchant/xxxhdpi/foodDish.jpeg")}
        />
      )}

      <Text style={styles.addText}>New Royal Place Restaurant</Text>
      <View style={styles.cardBotomBtn}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              screen && screen == "item"
                ? "M_EditMenuItemScreen"
                : "M_EditCategoryScreen"
            )
          }
          style={styles.addMenuButton}
        >
          <Image
            style={styles.menuIconButton}
            source={require("../Images/Merchant/xxxhdpi/edit.png")}
          />
          <Text style={styles.addButton}>Edit</Text>
        </TouchableOpacity>
        {activeVisible == true && (
          <TouchableOpacity
            style={[
              styles.addMenuButton,
              {
                marginLeft: hp(2),
                backgroundColor: Colors.green,
                // opacity: 0,
              },
            ]}
          >
            <Image
              style={styles.menuIconButton}
              source={require("../Images/Merchant/xxxhdpi/ic_tick.png")}
            />
            <Text style={styles.addButton}>Active</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.addMenuButton,
            {
              marginLeft: hp(2),
              backgroundColor: Colors.grayButtonBackground,
            },
          ]}
        >
          <Image
            style={styles.menuIconButton}
            source={require("../Images/Merchant/xxxhdpi/delete.png")}
          />
          <Text style={styles.addButton}>Delete</Text>
        </TouchableOpacity>
        {!activeVisible && (
          <View style={{ opacity: 0 }}>
            <TouchableOpacity
              style={[
                styles.addMenuButton,
                {
                  marginLeft: hp(2),
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
    marginHorizontal: hp(2),
    marginBottom: hp(2.5),
  },
  menuIconButton: {
    height: hp(1.8),
    width: hp(1.8),
    resizeMode: "contain",
    tintColor: Colors.white,
    marginRight: 5,
  },
});
