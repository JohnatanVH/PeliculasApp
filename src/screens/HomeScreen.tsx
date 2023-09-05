

import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, View } from 'react-native';
import Carousel from 'react-native-snap-carousel-v4';
// -------------------------------------------------------------------- //
import { useMovies } from '../hooks/useMovies';
import { MoviePoster } from '../compoents/MoviePoster';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HorizontalSlider } from '../compoents/HorizontalSlider';
import { GradientBackground } from '../compoents/GradientBackground';
import { getImageColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';


const { width: windowWidth } = Dimensions.get('window');

export const HomeScreen = () => {


  const { nowPlaying, popular, topRated, upComing, isLoading } = useMovies();
  const { top } = useSafeAreaInsets();
  const {setMainColors} = useContext(GradientContext);


  const getPosterColors = async(index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    const [primary = 'green', secondary = 'orange'] = await getImageColors(uri);

    setMainColors({primary, secondary});
  }

  useEffect(() => {
      if(nowPlaying.length > 0){
        getPosterColors(0)
      }    
  }, [nowPlaying])
  

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator color="red" size={100} />
      </View>
    )
  }

  return (
    <GradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ marginTop: top + 20 }}>
          {/* Carrusel Principal */}
          <View style={{ height: 440 }}>
            <Carousel
                ref={null}
                data={nowPlaying}
                renderItem={({ item }: any) => <MoviePoster movie={item} />}
                vertical={false}
                sliderWidth={windowWidth}
                itemWidth={300}
                onSnapToItem={index => getPosterColors(index)}
            />
   
          </View>

          {/* Películas populares */}
          <HorizontalSlider title='Populares' movies={popular} />
          <HorizontalSlider title='Mejor Calificadas' movies={topRated} />
          <HorizontalSlider title='Próximamente' movies={upComing} />

        </View>

      </ScrollView>
    </GradientBackground>
  )
}