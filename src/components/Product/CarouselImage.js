import React, { useState } from 'react'
import { Image, StyleSheet, Dimensions } from 'react-native'
import CarouselImage, { Pagination } from 'react-native-snap-carousel';
import { API_URL } from '../../utils/constants';
import { size } from 'lodash';
import colors from '../../styles/colors';
const width = Dimensions.get("window").width;
const height = 500;

export default function CarouselImages(props) {

    const { images } = props;

    const [imageActive, setImageActive] = useState(0)

    const renderItem = ({ item }) => {

        return (
            <Image style={styles.carousel} source={{ uri: `http://amantoli.com.mx/storage/${item.url}` }} />
        )

    }

    return (
        <>
            <CarouselImage
                layout={"default"}
                data={images}
                sliderWidth={width}
                itemWidth={width}
                renderItem={renderItem}
                onSnapToItem={(index) => setImageActive(index)}
                loop={true}
            />
            <Pagination
                dotsLength={size(images)}
                activeDotIndex={imageActive}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                dotStyle={styles.dot}
                inactiveDotStyle={styles.dot}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingBottom: 50
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20
    },
    carousel: {
        width: width,
        height: height,
        resizeMode: "contain",
        backgroundColor: colors.bgGray
    },
    dot: {
        backgroundColor: colors.primarytransparentborder
    }
})
