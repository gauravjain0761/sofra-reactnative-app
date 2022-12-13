import {
    View,
    Text,
    StyleSheet,
    FlatList, Image
} from "react-native";
import React, { useState, useEffect } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { useDispatch } from "react-redux";

export default function D_PickUpOrderScreen({ navigation }) {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    useEffect(() => {
        dispatch({ type: "PRE_LOADER", payload: false });
    }, []);

    const renderPickUpOrders = ({ item, index }) => {
        return (
            <View style={styles.mainListView} >
                <View style={styles.secondView} >
                    <Image
                        style={styles.imageStyle}
                        source={{ uri: "https://c4.wallpaperflare.com/wallpaper/367/822/458/chicken-wings-fried-food-food-cuisine-wallpaper-preview.jpg" }}
                    />
                </View>
                <View style={styles.desStyle} >
                    <View>
                        <Text style={styles.titleStyle} >Indian Thali</Text>
                        <Text style={styles.cousineStyle} >Breakfast, Lunch, Dinner</Text>
                        <Text style={styles.priceStyle} >AED 75.00</Text>
                    </View>
                    <Text style={styles.statusTextStyle} >Ready for pickup</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={ApplicationStyles.mainView}>

            <FlatList
                data={[1, 2, 3, 4, 5, 6]}
                renderItem={renderPickUpOrders}
                showsVerticalScrollIndicator={false}
            />


        </View >
    );
}
const styles = StyleSheet.create({
    mainListView: {
        flexDirection: 'row',
        padding: 5,
        marginVertical: 4,
        paddingVertical: 12,
        borderBottomWidth: 2,
        borderColor: '#dddddd'
    },
    secondView: { flex: 1 },
    imageStyle: { height: hp(17), borderRadius: 8 },
    desStyle: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 7 },
    titleStyle: { fontWeight: 'bold', color: 'black' },
    cousineStyle: { fontSize: 12, color: 'gray' },
    priceStyle: { fontSize: 12, color: 'black', fontWeight: 'bold' },
    statusTextStyle: { width: wp(25), paddingVertical: 5, borderRadius: 4, alignSelf: 'flex-end', fontSize: 10, textAlign: 'center', fontWeight: 'bold', color: Colors.white, backgroundColor: Colors.purple }

});
