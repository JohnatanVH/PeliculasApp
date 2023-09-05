import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { Movie } from '../interfaces/movieInterface';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';


interface Props {
    movie: Movie,
    height?: number,
    width?: number,
}


export const MoviePoster = ({ movie, height = 420, width = 300}: Props) => {

    const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    const navigation = useNavigation() as NavigationProp<any, any>;

    return (
        <TouchableOpacity 
            onPress={ () => navigation.navigate('DetailScreen', movie) }
            activeOpacity={0.9}
            style={{
                width: width,
                height: height,
                marginHorizontal: 2,
                paddingBottom: 7
            }}
        >
            <View style={styles.imageContainer}>

                <Image
                    source={{ uri }}
                    style={styles.Image}
                />

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Image: {
        flex: 1,
        borderRadius: 18,
    },
    imageContainer: {
        flex: 1,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,

        elevation: 9,
    },
});