import React from 'react';
import { Text, View } from 'react-native';
import { MovieFull } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import currencyFormatter from "currency-formatter";
import { CastItem } from './CastItem';
import { FlatList } from 'react-native-gesture-handler';

interface Props {
    movieFull: MovieFull,
    cast: Cast[],
    
}

export const MovieDetails = ({movieFull, cast}:Props) => {
    return(
        <>
            {/* Detalles */}
              <View style={{marginHorizontal: 20}}>
                <View style={{flexDirection: 'row'}}>
                    <Icon
                        name='star-outline'
                        color='grey'
                        size={16}
                    />
                    <Text>{ movieFull.vote_average }</Text>
                    <Text style={{marginLeft: 5}}>
                        - { movieFull.genres.map(g => g.name).join(', ') }
                    </Text>
                </View>


                {/* Historia */}
                <Text style={{fontSize: 20, marginTop: 10, fontWeight: 'bold', color: 'black'}}>
                    Historia
                </Text>

                <Text style={{color: 'black', opacity: 0.9, fontSize: 16}}>
                    {movieFull.overview}
                </Text>

                {/* Presupuesto */}
                <Text style={{fontSize: 20, marginTop: 10, fontWeight: 'bold', color: 'black'}}>
                  Presupuesto 
                </Text>

                <Text style={{color: 'black', opacity: 0.9, fontSize: 16}}>
                    {currencyFormatter.format(movieFull.budget, {code: 'USD'})}
                </Text>
              </View>
            {/* Casting */}
            <View style={{marginTop: 10}}>
            <Text style={{fontSize: 20, marginTop: 10, fontWeight: 'bold', color: 'black', marginHorizontal: 20}}>
                    Actores
                </Text>

            </View>
            <FlatList 
                data={cast}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <CastItem actor={item}/>}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{marginTop: 10, height: 70}}
            />
            
        </>
    )
}