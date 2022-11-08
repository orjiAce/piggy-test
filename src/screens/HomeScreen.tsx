import React, {useCallback, useEffect, useState} from 'react';

import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    RefreshControl,
    FlatList,
    TouchableOpacity,
    ActivityIndicator, Pressable
} from 'react-native';
import {RootStackScreenProps} from "../../types";
import {SafeAreaView} from "react-native-safe-area-context";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../helpers/normalize";
import {Fonts} from "../constants/Fonts";
import Colors from "../constants/Colors";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getCategories, getCurrentCategory} from "../api-actions/action";
import {IF} from "../helpers/ConditionJsx";
import {Feather, Ionicons} from "@expo/vector-icons";
import CartBox from "../components/CartBox";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {addItemToCart} from "../utils/functions";
import {addItem, addToCart} from "../app/slices/dataSlice";
import ViewItem from "./ViewItem";
import AnimatedView from "../components/AnimatedView";
import AnimatedViewX from "../components/AnimatedViewX";


interface itemProps {
    proceed: (selectCategory: string) => void,
    item: {
        item: {
            idCategory: string,
            strCategory: string,
            strCategoryThumb: string,

        }
    }
}

const CategoryItem = ({item, proceed}: itemProps) => {

    return (
        <TouchableOpacity onPress={() => proceed(item.item.strCategory)} style={styles.categoryItem}
                          activeOpacity={0.7}>


            <View style={styles.account}>
                <View style={[styles.itemCircle, {}]}>
                    <Image
                        style={[styles.itemCircleImage, {}]}
                        source={{uri: item.item.strCategoryThumb}}
                    />
                </View>

            </View>
            <View style={styles.accountTextWrap}>
                <Text style={styles.accountText}>
                    {item.item.strCategory}
                </Text>
            </View>
        </TouchableOpacity>
    )
}


const HomeScreen = ({navigation}: RootStackScreenProps<'HomeScreen'>) => {

    const dispatch = useAppDispatch()
    const [currentId, setCurrentId] = useState<string>('');

    const dataSlice = useAppSelector(state => state.appdata)


    const ViewItem = (item: { idMeal: string; strMeal: string; strMealThumb: string }) => {
        navigation.navigate('ViewItem', {
            item
        })
    }


    const {
        isLoading,
        data: categories,
    } = useQuery(['Categories'], getCategories, {
        onSuccess: (data) => {
            // console.log(data)
        }
    })


    const {
        isLoading: loadingSelected,
        data,
        mutate,

    } = useMutation(['selected-Category'], getCurrentCategory, {

        onSuccess: (data) => {

            // console.log(data.meals)
        }
    })

    useEffect(() => {
        if (!isLoading && categories) {
            setCurrentId(categories.categories[0].strCategory)
            mutate(currentId)

        }
    }, [currentId, categories])

    const selectCategory = (category: string) => {
        mutate(category)
    }

    const add = (item: { strMealThumb: string, idMeal: string, strMeal: string }) => {
        dispatch(addToCart({
            title: item.strMeal, id: item.idMeal, image: item.strMealThumb
        }))
    }

    const renderItem = useCallback((item: { item: { idCategory: string; strCategory: string; strCategoryThumb: string }; }) => (

        <CategoryItem item={item} proceed={selectCategory}/>

    ), [])


    const renderSelectItem = useCallback((item: { item: { idMeal: string; strMeal: string; strMealThumb: string }; }) => (

        <View  style={styles.bigCardItem}>
            <>

            <View style={styles.bigCardTop}>
                <Text style={styles.bigCardTitle}>
                    {item.item.strMeal}
                </Text>
                <Text style={styles.bigCardAmount}>
                    <Text style={{
                        color: "#15803D"
                    }}>$</Text>90.33
                </Text>
            </View>
            <View style={styles.cardBigImage}>
                <Image
                    style={[styles.itemImage, {}]}
                    source={{uri: item.item.strMealThumb, }}
                />
            </View>

            <View style={styles.bottomCardDetails}>
                <View style={styles.detailsLeft}>
                    <Text style={styles.bigCardAmount}>
                        🔥 44 Calories
                    </Text>
                    <View style={styles.iconText}>

                        <Ionicons name="time-outline" size={16} color={Colors.tintText}/>
                        <Text style={[styles.tinyText, {
                            marginLeft: 5,
                        }]}>
                            20 Min
                        </Text>

                    </View>

                </View>
                <View style={styles.detailsRight}>
                    <Pressable onPress={() => add(item.item)} style={styles.iconBasket}>
                        <Feather name="shopping-bag" size={24} color="black"/>
                    </Pressable>
                </View>
            </View>
            </>
        </View>


    ), [currentId])


    const keyExtractor = useCallback((item: { idCategory: any; }) => item.idCategory, [],);
    const keyExtractorSelected = useCallback((item: { idMeal: any; }) => item.idMeal, [],);


    return (
        <SafeAreaView style={styles.safeArea}>


            <View style={styles.topBar}>
                <View style={styles.leftButton}>

                    <View style={styles.userDetails}>
                        <Text style={styles.greeting}>
                            Hi,Orji
                        </Text>
                        <Text style={styles.message}>
                            Hungry now? 🔥
                        </Text>
                    </View>
                </View>

                <View style={styles.rightButton}>
                    <View style={styles.userImageWrap}>

                        <Image
                            style={styles.tAvatar}
                            source={{
                                uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',

                            }}/>

                    </View>
                </View>
            </View>
            <ScrollView style={{width: '100%',}} contentContainerStyle={styles.scrollView} scrollEnabled
                        showsVerticalScrollIndicator={false}


            >

                <IF condition={isLoading}>
                    <ActivityIndicator color={Colors.primary} size="large"/>
                </IF>
                {
                    !isLoading && categories &&

                    <FlatList
                        style={styles.flatlist}
                        contentContainerStyle={{alignItems: 'center'}}
                        horizontal
                        data={categories.categories.slice(0, 6)}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        showsHorizontalScrollIndicator={false}
                    />
                }

                <View style={styles.CardTop}>
                    <Text style={styles.listTitle}>
                        Popular items
                    </Text>
                    <TouchableOpacity activeOpacity={0.7} style={styles.seeAll}>
                        <Text style={styles.tintText}>See All</Text>
                    </TouchableOpacity>
                </View>


                <IF condition={loadingSelected}>
                    <ActivityIndicator color={Colors.primary} size="small"/>
                </IF>

                {

                    !loadingSelected && data &&
                    <FlatList
                        style={styles.flatlist}


                        horizontal
                        data={data.meals.slice(0,5)}
                        renderItem={renderSelectItem}
                        keyExtractor={keyExtractorSelected}
                        showsHorizontalScrollIndicator={false}
                    />
                }
            </ScrollView>


            <CartBox/>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        paddingHorizontal: pixelSizeHorizontal(20)
    },
    scrollView: {
        backgroundColor: "white",
        width: '100%',

    },
    topBar: {
        width: '100%',
        height: heightPixel(90),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    userImageWrap: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 45,
        overflow: 'hidden'
    },
    userImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'

    },
    buttonWrap: {
        width: '60%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'green'
    },
    rightButton: {
        width: widthPixel(100),
        height: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    leftButton: {
        width: '60%',
        height: '90%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userDetails: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginHorizontal: pixelSizeHorizontal(10)
    },
    greeting: {
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(14),
        color: "#000",
    },
    message: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(20),
        color: Colors.textDark,
    },
    tAvatar: {
        borderRadius: 100,
        resizeMode: 'cover',
        width: '80%',
        height: '80%'
    },
    flatlist: {
        width: '100%',
        // height: heightPixel(740)
    },
    categoryItem: {
        marginHorizontal: pixelSizeHorizontal(10),
        width: widthPixel(100),
        alignItems: 'center',
        height: heightPixel(120),
        borderColor: Colors.border,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
    },
    account: {
        width: 60,
        height: 60,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',

    },
    itemCircle: {
        width: 50,
        height: 50,

        alignItems: 'center',
        justifyContent: 'center',

    },
    itemCircleImage: {

        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        resizeMode: 'center'
    },


    accountTextWrap: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    accountText: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(12),
        textAlign: 'center',

    },
    selectBtn: {
        borderRadius: 5,
        marginVertical: pixelSizeVertical(10),
        width: '100%',
        height: heightPixel(50),
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,

    },
    itemText: {
        marginLeft: 8,
        fontSize: fontPixel(16),
        textTransform: 'capitalize',
        color: Colors.textDark,
        fontFamily: Fonts.faktumSemiBold,
    },
    item: {
        flexDirection: 'row',
        width: '90%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    CardTop: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: heightPixel(60),

    },
    listTitle: {
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold,
        color: Colors.textDark
    },
    tintText: {
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular,
        color: Colors.tintText
    },
    seeAll: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bigCardItem: {
        backgroundColor: "#F8F8F8",
        width: widthPixel(270),
        height: heightPixel(330),
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        marginRight: 10,
    },
    bigCardTop: {
        width: '100%',
        height: heightPixel(60),
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    bigCardTitle: {
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold,
        color: Colors.textDark
    },
    bigCardAmount: {
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumSemiBold,
        color: Colors.textDark
    },
    tinyText: {
        justifyContent: 'center',
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular,
        color: Colors.tintText
    },
    iconText:
        {
            alignItems: 'center',
            height: 30,
            justifyContent: 'center',
            flexDirection: 'row'

        },
    cardBigImage: {
        width: widthPixel(140),
        height: heightPixel(140),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:200,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 7.22,
        backgroundColor:"#fff",
        elevation: 3,

    },
    itemImage: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        borderRadius:200
    },
    bottomCardDetails: {
        width: '100%',
        height: heightPixel(60),
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'space-between'
    },
    detailsLeft: {
        width: '65%',
        height: '100%',
        alignItems: 'flex-start',

        justifyContent: 'center'
    },
    detailsRight: {
        width: '30%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconBasket: {
        backgroundColor: "#fff",
        width: 45,
        borderRadius: 18,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'

    }

})

export default HomeScreen;
