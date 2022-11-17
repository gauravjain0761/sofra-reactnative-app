import './Config';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import RootContainer from './Navigation/RootContainer';
import {
  View,
  Text,
  TextInput,
  LogBox,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ApplicationStyles from './Themes/ApplicationStyles';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import Colors from './Themes/Colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {commonFontStyle} from './Themes/Fonts';

function App() {
  const _TOAST = useSelector(e => e.common.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'TOAST', payload: {}});
    LogBox.ignoreAllLogs(true);
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
  }, []);

  useEffect(() => {
    /**
     * Toast message display
     */
    if (_TOAST && _TOAST.hasOwnProperty('message')) {
      Toast.show({
        text1: _TOAST.message,
        type: _TOAST.type,
      });
    }
  }, [_TOAST]);

  const toastConfig = {
    success: ({text1, type, props, ...rest}) =>
      type === 'success' && (
        <View style={styles.toastStyle}>
          <Text style={styles.textStyleToast}>{text1}</Text>
        </View>
      ),
    // error: ({ text1, type, props, ...rest }) =>
    //   type === "error" && (
    //     <View style={styles.toastStyle}>
    //       <Icons.ToastIcon height={heightPercentageToDP(5)} />
    //       <View style={styles.toastRightView}>
    //         <Text style={styles.toasterror}>{text1}</Text>
    //       </View>
    //     </View>
    //   ),
    // info: () => {},
    // any_custom_type: () => {},
  };

  return (
    <View style={ApplicationStyles.applicationView}>
      <RootContainer />
      <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
    </View>
  );
}
export default App;

const styles = StyleSheet.create({
  toastStyle: {
    backgroundColor: Colors.parrotGreen,
    paddingVertical: hp(1.8),
    width: Dimensions.get('window').width - hp(8),
    marginTop: 100,
    borderRadius: 50,
  },
  textStyleToast: {
    ...commonFontStyle('', 12, Colors.white),
    textAlign: 'center',
  },
});
