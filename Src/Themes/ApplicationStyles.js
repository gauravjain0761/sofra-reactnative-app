import { StyleSheet } from "react-native";
import Colors from "./Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
export default StyleSheet.create({
  applicationView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainView: {
    flex: 1,
    backgroundColor: Colors.registrationBackground,
    paddingHorizontal: hp(2),
  },
  mainViewWithoutPadding: {
    flex: 1,
    backgroundColor: Colors.registrationBackground,
  },
});
