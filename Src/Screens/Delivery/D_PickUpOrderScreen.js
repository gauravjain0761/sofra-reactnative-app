import {
    View,
    Text,
    StyleSheet,
    FlatList, Image, ScrollView, TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { useDispatch } from "react-redux";
import D_OrderItems from "../../Components/DeliveryComponent/D_OrderItems";
import { orderStatusData } from "../../Constant/Constant";

let ORDERS = [
    {
        restaurant: {
            name: "Taj Hotel"
        },
        totalPrice: 30,
        status: "READY_FOR_PICKUP"
    },
    {
        restaurant: {
            name: "Taj Hotel"
        },
        totalPrice: 30,
        status: "READY_FOR_PICKUP"
    },
    {
        restaurant: {
            name: "Taj Hotel"
        },
        totalPrice: 30,
        status: "READY_FOR_PICKUP"
    },
    {
        restaurant: {
            name: "Taj Hotel"
        },
        totalPrice: 30,
        status: "READY_FOR_PICKUP"
    },
]

export default function D_PickUpOrderScreen({ navigation }) {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    useEffect(() => {
        dispatch({ type: "PRE_LOADER", payload: false });
    }, []);


    return (
        <View style={ApplicationStyles.mainViewWithoutPadding}>
            <ScrollView>
                {ORDERS.map((item, index) => {
                    let status = orderStatusData.filter(
                        (obj) => obj.type == item.status
                    );
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                // setcategoryDetail(true), setselectedOrder(item);
                            }}
                        >
                            <D_OrderItems
                                item={item}
                                navigation={navigation}
                                status={status[0]}
                            />
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
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
