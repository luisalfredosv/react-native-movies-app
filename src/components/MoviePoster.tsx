import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, StyleSheet, View} from 'react-native';

import {Movie} from '../interfaces/movies.interface';
import {RootStackParams} from '../navigation/Navigation';

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
}

export const MoviePoster = ({movie, height = 420, width = 300}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParams, 'DetailScreen'>>();

  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <TouchableOpacity
      style={{width, height}}
      onPress={() => navigation.navigate('DetailScreen', movie)}
      accessible>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri,
            cache: 'force-cache',
          }}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 0.8,
    marginHorizontal: 5,
    paddingBottom: 20,
    paddingHorizontal: 8,
  },
  imageContainer: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  image: {
    flex: 1,
    borderRadius: 15,
  },
});
