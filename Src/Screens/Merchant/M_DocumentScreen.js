import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
  PermissionsAndroid,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import { Dropdown } from "react-native-element-dropdown";
import PinkButton from "../../Components/PinkButton";
import CheckBox from "@react-native-community/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  AddDocument,
  deleteDocument,
  getDocuments,
} from "../../Services/MerchantApi";
import DocumentPicker from "react-native-document-picker";
import {
  dispatchErrorAction,
  dispatchSuccessAction,
} from "../../Services/CommonFunctions";
import moment from "moment";
import { media_url } from "../../Config/AppConfig";
import RNFetchBlob from "rn-fetch-blob";
import { strings } from "../../Config/I18n";
import { getLanguage } from "../../Services/asyncStorage";

export default function M_DocumentScreen({ navigation }) {
  const [document, setdocument] = useState("");
  const dispatch = useDispatch();
  const DOCUMENTS = useSelector((e) => e.merchant.documents);
  const PRELOADER = useSelector((e) => e.merchant.preLoader);

  useEffect(() => {
    dispatch({ type: "PRE_LOADER", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getDocuments());
    });
  }, []);
  const openPicker = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: "fullScreen",
      });
      setdocument(response[0]);
    } catch (err) {
      console.warn(err);
    }
  };

  const onAddDocuments = async () => {
    let lang = await getLanguage();
    if (document !== "") {
      let data = {
        language: lang,
        "files[0]": {
          uri: document.uri,
          type: document.type, // or photo.type image/jpg
          name: moment().unix() + "_" + document.name,
        },
      };
      dispatch(
        AddDocument(data, () => {
          setdocument("");
        })
      );
    } else {
      dispatchErrorAction(
        dispatch,
        strings("validationString.lateralEntry.please_select_document")
      );
    }
  };

  const onDeleteDocument = async (id) => {
    let lang = await getLanguage();

    dispatch({
      type: "DELETE_MODAL",
      payload: {
        isVisible: true,
        onDelete: () => {
          let data = { docId: id, language: lang };
          dispatch(deleteDocument(data));
        },
      },
    });
  };
  const isPermitted = async () => {
    // if (await isPermitted()) {

    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        Alert.alert("Write permission err", err);
        return false;
      }
    } else {
      return true;
    }
    // }
  };

  const download = async (item) => {
    if (await isPermitted()) {
      dispatch({ type: "PRE_LOADER", payload: true });
      let FILE_URL = media_url + item.image;

      let filePath =
        (Platform.OS == "ios"
          ? RNFetchBlob.fs.dirs.DocumentDir
          : RNFetchBlob.fs.dirs.DownloadDir) +
        "/" +
        item.image;

      let options = {
        fileCache: true,
        addAndroidDownloads: {
          path: filePath,
          description: "downloading file...",
          notification: true,
          useDownloadManager: true,
        },
      };
      RNFetchBlob.config(options)
        .fetch("GET", FILE_URL)
        .then((res) => {
          dispatch({ type: "PRE_LOADER", payload: false });
          dispatchSuccessAction(
            dispatch,
            strings(
              "validationString.lateralEntry.documents_download_successfull"
            )
          );
        })
        .catch((err) => {
          dispatch({ type: "PRE_LOADER", payload: false });
          dispatchErrorAction(
            dispatch,
            strings("validationString.lateralEntry.something_went_wrong")
          );
        });
    } else {
      dispatch({ type: "PRE_LOADER", payload: false });
      dispatchErrorAction(
        dispatch,
        "Permission denied, Please allow storages from app setting"
      );
    }
  };

  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.row}>
      <View style={styles.innerRow}>
        <Image
          source={require("../../Images/Merchant/xxxhdpi/ic_doc_color.png")}
          style={styles.docImage}
        />
        <Text numberOfLines={1} style={styles.docNmae}>
          {item.image}
        </Text>
      </View>
      <View style={styles.innerRow2}>
        <TouchableOpacity onPress={() => download(item)}>
          <Image
            source={require("../../Images/Merchant/xxxhdpi/ic_download.png")}
            style={[styles.docImage, { marginRight: hp(1) }]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDeleteDocument(item.id)}>
          <Image
            source={require("../../Images/Merchant/xxxhdpi/ic_remove.png")}
            style={styles.docImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={ApplicationStyles.welcomeText}>
          {strings("documentScreen.documents")}
        </Text>
        <View>
          <View>
            <TouchableOpacity
              onPress={() => openPicker()}
              style={styles.imageView}
            >
              {document == "" ? (
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.uploadText}>
                    {strings("documentScreen.upload_files_here")}
                  </Text>
                  <Image
                    source={require("../../Images/Merchant/xxxhdpi/ic_doc.png")}
                    style={styles.imageVector}
                  />
                  <Text style={styles.attachText}>
                    {strings("documentScreen.choose_file_here")}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.uploadTextTitle}>{document.name}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          {!PRELOADER && (
            <FlatList
              nestedScrollEnabled
              data={DOCUMENTS}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <Text style={ApplicationStyles.nodataStyle}>
                  {strings("documentScreen.lateralEntry.no_data_found")}
                </Text>
              }
            />
          )}
        </View>
      </ScrollView>
      <PinkButton
        onPress={() => onAddDocuments()}
        style={styles.dbuttonStyle}
        text={"small"}
        name={strings("documentScreen.upload")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  imageView: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: hp(20),
    borderColor: Colors.placeholderColor,
    borderWidth: 1,
    borderStyle: "dashed",
    marginBottom: hp(2),
    overflow: "hidden",
  },
  imageVector: {
    width: hp(8),
    height: hp(8),
    resizeMode: "contain",
  },
  docImage: {
    width: hp(4),
    height: hp(4),
    resizeMode: "contain",
  },
  attachText: {
    ...commonFontStyle("M_400", 12, Colors.darkGrey),
    marginTop: hp(1.5),
  },
  uploadText: {
    ...commonFontStyle("M_700", 14, Colors.black),
    marginBottom: hp(1.5),
  },
  uploadTextTitle: {
    ...commonFontStyle("M_700", 18, Colors.black),
    marginBottom: hp(1.5),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    marginBottom: hp(1.5),
    borderRadius: 8,
    padding: hp(1.5),
    alignItems: "center",
  },
  innerRow: {
    alignItems: "center",
    flexDirection: "row",
    width: "73%",
  },
  innerRow2: {
    alignItems: "center",
    flexDirection: "row",
  },
  docNmae: {
    ...commonFontStyle("M_600", 14, Colors.black),
    width: "70%",
    marginLeft: hp(1.5),
  },
  dbuttonStyle: {
    marginBottom: hp(3),
  },
});
