import React, {useContext, useEffect} from 'react';
import Carousel from 'react-native-snap-carousel';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useMovies} from '../hooks/useMovies';
import {MoviePoster} from '../components/MoviePoster';
import {Movie} from '../interfaces/movies.interface';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {GradientBackground} from '../components/GradientBackground';
import {getImageColors} from '../helpers/get-colors';
import {GradientContext} from '../contexts/GradientContext';

const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  const {navigate} = useNavigation();
  const {setMainColors} = useContext(GradientContext);

  const {
    isLoading,
    moviesNowPlaying,
    moviesPopular,
    moviesTopRated,
    moviesUpcoming,
  } = useMovies();
  const {top, bottom} = useSafeAreaInsets();

  const getPosterColors = async (index: number) => {
    const currentMovie = moviesNowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`;

    const {primary = '#49494b', secondary = '#01010b'} = await getImageColors(
      uri,
    );

    setMainColors({primary, secondary});
  };

  useEffect(() => {
    if (moviesNowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [moviesNowPlaying]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <ActivityIndicator color="red" size={50}></ActivityIndicator>
      </View>
    );
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={styles.searchButton}>
          <TouchableOpacity onPress={() => navigate('SearchScreen')}>
            <Icon color={'gray'} name="search-outline" size={35} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: top + 30,
            marginBottom: bottom + 20,
          }}>
          <View style={styles.carouserContainer}>
            <Carousel
              data={moviesNowPlaying}
              renderItem={({item}: {item: Movie}) => (
                <MoviePoster movie={item} />
              )}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>

          <HorizontalSlider movies={moviesPopular} title="Populares" />

          <HorizontalSlider movies={moviesTopRated} title="Más vistas" />

          <HorizontalSlider movies={moviesUpcoming} title="Estrenos" />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  carouserContainer: {height: 440, marginTop: 30},
  searchButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 10,
    top: 15,
    right: 15,
  },
  trendingMovies: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'gray',
  },
});
