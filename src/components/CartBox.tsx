import React from 'react';

import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {fontPixel, heightPixel} from "../helpers/normalize";
import Colors from "../constants/Colors";
import {Fonts} from "../constants/Fonts";
import {useAppSelector} from "../app/hooks";
import {useNavigation} from "@react-navigation/native";
import AnimatedView from "./AnimatedView";


interface props {
    item?: {}
}

const CartBox = ({item}: props) => {
    const {navigate} = useNavigation()
    const dataSlice = useAppSelector(state => state.appdata)
    const ViewItem = (item: { idMeal: string; strMeal: string; strMealThumb: string }) => {
        navigate('ViewItem', {
            item
        })
    }

    return (
        <AnimatedView style={styles.CartBox}>
            <>

            <View style={styles.cartDetails}>
                <Text style={styles.cartTitle}>Cart</Text>
                <Text style={styles.cartSubTitle}>{dataSlice.cart.length} items</Text>
            </View>
            <View style={styles.itemImages}>
                {
                    dataSlice.cart.slice(0, 2).map((({id, image, title}) => (
                        <TouchableOpacity onPress={() => ViewItem({idMeal:id, strMeal:title,strMealThumb:image })} key={id} style={styles.itemImageWrap}>

                            <Image source={{uri: image}} style={styles.itemImage}/>
                        </TouchableOpacity>

                    )))
                }
            </View>
            </>
        </AnimatedView>
    );
};

const styles = StyleSheet.create({
    CartBox: {
        width: '100%',
        height: heightPixel(120),
        backgroundColor: Colors.secondary,
        bottom: 30,
        borderRadius: 25,
        position: 'absolute',
        flexDirection: 'row',
        padding: 25,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cartDetails: {
        width: '30%',
        alignItems: 'flex-start',

        justifyContent: "space-evenly",
        height: '100%',
    },
    itemImages: {
        width: '60%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "flex-end",
        height: '100%',
    },
    itemImageWrap: {
        borderRadius: 35,
        width: 50,
        height: 50,
        backgroundColor: "#fff",
        alignItems: 'center',
        marginRight: 5,
        justifyContent: 'center',
    },
    itemImage: {
        borderRadius: 35,
        width: 40,
        height: 40,
        resizeMode: 'center'
    },
    cartTitle: {
        color: "#fff",
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(25)
    },
    cartSubTitle: {
        color: "#B7DCCD",
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(20)
    },

})

export default CartBox;
