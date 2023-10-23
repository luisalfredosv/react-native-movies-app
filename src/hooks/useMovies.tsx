import React, {useEffect, useState} from 'react';
import movies from '../api/movies';
import {Movie, MoviesResponse} from '../interfaces/movies.interface';

interface MoviesState {
  moviesNowPlaying: Movie[];
  moviesPopular: Movie[];
  moviesTopRated: Movie[];
  moviesUpcoming: Movie[];
}

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMoviesState] = useState<MoviesState>({
    moviesNowPlaying: [],
    moviesPopular: [],
    moviesTopRated: [],
    moviesUpcoming: [],
  });

  const getMovies = async () => {
    const nowPlayingPromise = movies.get<MoviesResponse>('/now_playing');
    const popularPromise = movies.get<MoviesResponse>('/popular');
    const topRelatedPromise = movies.get<MoviesResponse>('/top_rated');
    const upcomingPromise = movies.get<MoviesResponse>('/upcoming');

    const [nowPlaying, popular, topRelated, upcoming] = await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topRelatedPromise,
      upcomingPromise,
    ]);

    setMoviesState({
      moviesNowPlaying: nowPlaying.data.results,
      moviesPopular: popular.data.results,
      moviesTopRated: topRelated.data.results,
      moviesUpcoming: upcoming.data.results,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    isLoading,
    ...moviesState,
  };
};
