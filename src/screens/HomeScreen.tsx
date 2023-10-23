import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
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

const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  const {navigate} = useNavigation();
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

    const {primary, secondary} = await getImageColors(uri);
  };

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
        {/* <View style={styles.searchButton}>
        <TouchableOpacity>
          <Icon color={'gray'} name="search-outline" size={30} />
        </TouchableOpacity>
      </View> */}

        <View style={{marginTop: top + 20, marginBottom: bottom + 20}}>
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
  container: {},
  carouserContainer: {height: 440},
  searchButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 10,
    top: 10,
    left: 5,
  },
});
