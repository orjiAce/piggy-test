import React, {useCallback, useRef, useState} from 'react';

import {Text, View, Image, Dimensions, StyleSheet, FlatList, ImageProps, Platform} from 'react-native';
import Colors from "../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../helpers/normalize";
import {Fonts} from "../../constants/Fonts";
import {Asset} from "expo-asset";

import LottieView from 'lottie-react-native';



const {width} = Dimensions.get('window');
const slides = [
    {
        id: '1',
        imagePath:require('../../assets/images/Nitrogen.png'),
        message: 'Build your savings with ease & discipline',
    },
    {
        id: '2',
        imagePath:require('../../assets/images/Natural.png'),
        message: 'Invest with ease in verified opportunity',
    },
    {
        id: '3',
        imagePath:require('../../assets/images/Ozone.png'),
        message: "Lock funds you don't want to be tempted to touch",
    },
    {
        id: '4',
        imagePath:require('../../assets/images/box-amico.png'),
        message: "Lock funds you don't want to be tempted to touch",
    },

];

interface itemProps {
    item: {
        message: string,
        imagePath: string,
        title: string,
        lottiePath:string,
        image: ImageProps
    }
}




//const directoryPath = Platform.OS === 'android' ? RNFS.PicturesDirectoryPath : RNFS.DocumentDirectoryPath;

const Slide = ({item}: itemProps) => {
    const {message,imagePath} = item

    const animation = useRef(null);

//const imageGif = compressImage()

   // let showImage = require(imagePath)
    return (
        <View style={{alignItems: 'center',width, justifyContent: 'space-evenly'}}>



            <View style={[styles.imageWrap,{
                width
            }]}>


                    <Image
                        style={{height: heightPixel(300), width: widthPixel(250), resizeMode:'center'}}
                        // Find more Lottie files at https://lottiefiles.com/featured
                        source={imagePath}
                    />


            </View>
            <View style={styles.textWrap}>
                <Text style={styles.message}>{message}</Text>

            </View>

        </View>
    );
};

const OnboardScreen = () => {


    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const ref = useRef(null);
    const updateCurrentSlideIndex = (e: { nativeEvent: { contentOffset: { x: any; }; }; }) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };


    const keyExtractor = useCallback(
        (item) => item.id,
        [],
    );

    return (
        <View style={styles.container}>

            <FlatList
                ref={ref}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                style={{height: '90%'}}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={keyExtractor}
                data={slides}
                pagingEnabled
                renderItem={({item}) => <Slide item={item}/>}
            />
            <View
                style={styles.slideContainer}>
                {/* Render indicator */}
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.indicator,
                            currentSlideIndex == index && {
                                backgroundColor:"#E5E7EB",
                            },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textWrap: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    title: {
        color: Colors.textPrimary,
        fontSize: fontPixel(28),
        fontFamily:Fonts.faktumBold
    },
    message: {
        color: "#fff",
        textAlign: 'center',
        lineHeight: heightPixel(35),
        fontSize: fontPixel(22),
        fontFamily:Fonts.faktumSemiBold
    },

    subtitle: {
        
    },
    slideContainer: {
        height: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    indicator: {
        height: 5,
        width: 30,
        backgroundColor: Colors.tintText,
        marginHorizontal: pixelSizeHorizontal(3),
        borderRadius: 5,
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageWrap:{
        alignItems:'center',
        justifyContent:'center',
        height:heightPixel(300),
    }
})

export default OnboardScreen;
