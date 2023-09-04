import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RootStackParams } from '../navigation/Navigation';
import { ScrollView } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../compoents/MovieDetails';

const ScreenHight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { };

export const DetailScreen = ({ route, navigation }: Props) => {

  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const { isLoading, cast, movieFull } = useMovieDetails(movie.id);

  return (
    <ScrollView>

      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image
            source={{ uri }}
            style={styles.posterImage}
          />
        </View>
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      {
        isLoading
          ? <ActivityIndicator size={30} color='grey' style={{ marginTop: 20 }} />
          : <MovieDetails movieFull={movieFull!} cast={cast} />
      }

      {/* Botón para cerrar */}
      <View style={styles.backButton} >
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon color='white' name='arrow-back-outline' size={30} />
        </TouchableOpacity>
      </View>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: ScreenHight * 0.7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.9,
    shadowRadius: 9,
    elevation: 9,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  posterImage: {
    flex: 1,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    color: 'black',
    opacity: 0.8
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  backButton: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.9,
    shadowRadius: 200.00,
    elevation: 24,
    zIndex: 999,
    top: 30,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    height: 40,
    width: 40
  }
});