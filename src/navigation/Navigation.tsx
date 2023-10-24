import {createStackNavigator} from '@react-navigation/stack';

import {Movie} from '../interfaces/movies.interface';
import {HomeScreen} from '../screens/HomeScreen';
import {DetailScreen} from '../screens/DetailScreen';
import {SearchScreen} from '../screens/SearchScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  DetailScreen: Movie;
  SearchScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};
