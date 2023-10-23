import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {format} from 'currency-formatter';

import {Cast, MovieDetailsResponse} from '../interfaces/movies.interface';
import {CastItem} from './CastItem';

interface Props {
  movieDetails: MovieDetailsResponse;
  cast: Cast[];
}

export const MovieDetails = ({cast, movieDetails}: Props) => {
  return (
    <>
      <View style={styles.marginContainer}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="star-outline" color={'gray'} size={16} />
          <Text style={{marginLeft: 5, color: 'gray'}}>
            {movieDetails.vote_average}
          </Text>
          <Text style={{marginLeft: 5, color: 'gray'}}>
            - {movieDetails.genres.map(g => g.name).join(', ')}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 23,
            marginTop: 10,
            fontWeight: 'bold',
            color: 'gray',
          }}>
          Historia
        </Text>
        <Text style={{fontSize: 16, textAlign: 'justify', color: 'gray'}}>
          {movieDetails.overview}
        </Text>

        <Text
          style={{
            fontSize: 23,
            marginTop: 10,
            fontWeight: 'bold',
            color: 'gray',
          }}>
          Presupuesto
        </Text>
        <Text style={{fontSize: 16, textAlign: 'justify', color: 'gray'}}>
          {format(movieDetails.budget, {code: 'USD'})}
        </Text>
      </View>

      <View style={{marginTop: 10, marginBottom: 100}}>
        <Text
          style={{
            fontSize: 23,
            marginTop: 10,
            fontWeight: 'bold',
            marginHorizontal: 20,
            color: 'gray',
          }}>
          Actores
        </Text>
        <FlatList
          data={cast}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}: {item: Cast}) => <CastItem actor={item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10, height: 70}}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
});
