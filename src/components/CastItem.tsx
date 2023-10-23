import React from 'react';
import {Cast} from '../interfaces/movies.interface';
import {Image, Text, View, StyleSheet} from 'react-native';

interface Props {
  actor: Cast;
}

export const CastItem = ({actor}: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;

  return (
    <View style={styles.container}>
      {actor.profile_path && (
        <Image
          source={{uri}}
          style={{width: 70, height: 70, borderRadius: 10}}
        />
      )}

      <View style={styles.actorInfo}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'gray'}}>
          {actor.name}
        </Text>
        <Text style={{fontSize: 16, opacity: 0.7, color: 'gray'}}>
          {actor.character}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 20,
    paddingRight: 10,
  },
  actorInfo: {
    marginLeft: 10,
    marginTop: 5,
  },
});
