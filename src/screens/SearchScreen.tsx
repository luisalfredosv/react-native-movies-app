import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Platform,
  ActivityIndicator,
  Dimensions,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Movie} from '../interfaces/movies.interface';
import {MoviePoster} from '../components/MoviePoster';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSearch} from '../hooks/useSearch';

const {width: windowWidth} = Dimensions.get('window');

export const SearchScreen = () => {
  const {goBack} = useNavigation();
  const {top} = useSafeAreaInsets();
  const [text, onChangeText] = useState('');
  const {isLoading, results, search} = useSearch(text);

  const onSearch = async () => {
    search(text);
  };

  return (
    <ScrollView>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon color={'gray'} name="arrow-back-outline" size={30} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          ...styles.container,
          marginTop: Platform.OS === 'ios' ? top : top + 10,
        }}>
        <View style={styles.textBackground}>
          <TextInput
            style={{
              ...styles.textInput,
              top: Platform.OS === 'ios' ? 0 : 2,
            }}
            onChangeText={onChangeText}
            value={text}
            placeholder="Buscar películas..."
            placeholderTextColor={'gray'}
            keyboardType="web-search"
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={onSearch}
          />
          <TouchableOpacity onPress={() => onSearch()}>
            <Icon name="search-outline" color={'grey'} size={30} />
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <ActivityIndicator color="red" size={50}></ActivityIndicator>
        </View>
      ) : (
        <View style={{marginTop: 10, flexDirection: 'column'}}>
          {results.length > 0 && (
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'gray',
              }}>
              Resultados:
            </Text>
          )}

          <FlatList
            data={results}
            renderItem={({item}: {item: Movie}) => (
              <View style={{marginTop: 10, marginHorizontal: 5}}>
                <MoviePoster
                  movie={item}
                  width={windowWidth / 3 - 10}
                  height={200}
                />
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            numColumns={3}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 10,
    top: 15,
    left: 8,
  },
  container: {
    marginLeft: 50,
    marginRight: 20,
  },
  textBackground: {
    backgroundColor: '#F3F1F3',
    opacity: 0.8,
    borderRadius: 50,
    height: 42,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    top: 2,
    color: 'black',
  },
});
