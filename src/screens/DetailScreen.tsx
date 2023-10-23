import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {RootStackParams} from '../navigation/Navigation';
import {useMovieDetails} from '../hooks/useMovieDetails';
import {MovieDetails} from '../components/MovieDetails';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}
const {height: windowHeight} = Dimensions.get('window');

export const DetailScreen = ({route, navigation}: Props) => {
  const movie = route.params;
  const {cast, isLoading, movieDetails} = useMovieDetails(movie.id);

  const uri = `https://image.tmdb.org/t/p/w400${movie.poster_path}`;

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image
            source={{
              uri,
            }}
            style={styles.posterImage}
          />
        </View>
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.title}</Text>
        <Text style={styles.title}>{movie.original_title}</Text>
      </View>

      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <ActivityIndicator color="red" size={35}></ActivityIndicator>
        </View>
      ) : (
        <MovieDetails movieDetails={movieDetails} cast={cast} />
      )}

      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon color={'gray'} name="arrow-back-outline" size={30} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: windowHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
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
    height: 500,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
  subTitle: {
    fontSize: 16,
    opacity: 0.8,
    color: 'gray',
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 10,
    top: 10,
    left: 5,
  },
});
