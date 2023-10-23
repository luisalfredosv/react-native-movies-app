import React from 'react';
import {Movie} from '../interfaces/movies.interface';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {MoviePoster} from './MoviePoster';

interface Props {
  title?: string;
  movies: Movie[];
}

export const HorizontalSlider = ({title, movies}: Props) => {
  return (
    <View style={(styles.container, {height: title ? 260 : 220})}>
      {title && <Text style={styles.popularText}>{title}</Text>}
      <FlatList
        data={movies}
        renderItem={({item}: {item: Movie}) => (
          <MoviePoster movie={item} width={140} height={200} />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  carouserContainer: {height: 440},
  popularContainer: {height: 300},
  popularText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'gray',
  },
});
