import {useEffect, useState} from 'react';
import {
  Cast,
  CreditsResponse,
  MovieDetailsResponse,
} from '../interfaces/movies.interface';
import movies from '../api/movies';

interface MovieDetailsState {
  cast: Cast[];
  isLoading: boolean;
  movieDetails: MovieDetailsResponse;
}

export const useMovieDetails = (movieId: number): MovieDetailsState => {
  const [state, setState] = useState<MovieDetailsState>({
    cast: [],
    movieDetails: {} as MovieDetailsResponse,
    isLoading: true,
  });

  const getMovieDetails = async () => {
    const movieDetailPromise = await movies.get<MovieDetailsResponse>(
      `/${movieId}`,
    );
    const creditsPromise = await movies.get<CreditsResponse>(
      `/${movieId}/credits`,
    );

    const [movieDetails, credits] = await Promise.all([
      movieDetailPromise,
      creditsPromise,
    ]);

    setState({
      cast: credits.data.cast,
      movieDetails: movieDetails.data,
      isLoading: false,
    });
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {
    ...state,
  };
};
