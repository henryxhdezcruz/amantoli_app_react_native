import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, Dimensions, TouchableWithoutFeedback } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { size } from 'lodash';
import { getBannerApi } from "../../api/home-banner"
import { API_URL } from "../../utils/constants"
import colors from '../../styles/colors';

const width = Dimensions.get("window").width - 20;
const height = 200;

export default function Banner() {

    const [banners, setBanners] = useState(null);

    const [bannerActive, setBannerActive] = useState(0);

    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const response = await getBannerApi();
            setBanners(response);
        })();
    }, []);

    if (!banners) return null;

    const renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback
                onPress={() => goToProduct(item.product._id)}
            >
                <Image
                    style={styles.carousel}
                    source={{ uri: `${API_URL}${item.banner.url}` }}
                />
            </TouchableWithoutFeedback>
        )
    }

    const goToProduct = (id) => {
        navigation.push("product", { idProduct: id });
    };

    return (
        <View style={styles.container}>
            <Carousel
                layout={"default"}
                data={banners}
                sliderWidth={width}
                itemWidth={width}
                renderItem={renderItem}
                onSnapToItem={(index) => setBannerActive(index)}
                autoplay
                autoplayInterval={5000}
                loop={true}
            />
            <Pagination
                dotsLength={size(banners)}
                activeDotIndex={bannerActive}
                inactiveDotOpacity={0.6}
                inactiveDotScale={0.6}
                containerStyle={styles.dotsContainer}
                dotStyle={styles.dot}
                inactiveDotStyle={styles.dot}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    dotsContainer: {
        position: "absolute",
        bottom: -15,
        width: "100%"
    },
    container: {
        position: "relative",
        backgroundColor: colors.bgwhite,
        margin: 10,
        borderRadius: 5,
        elevation: 5
    },
    carousel: {
        width,
        height,
        borderRadius: 5,
    },
    dot: {
        backgroundColor: colors.primarytransparentborder
    },
})
