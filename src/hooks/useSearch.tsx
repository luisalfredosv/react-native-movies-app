import React, {useEffect, useState} from 'react';
import movies from '../api/movies';
import {Movie, SearchResponse} from '../interfaces/movies.interface';

export const useSearch = (term: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<Movie[]>([]);

  const search = async (term: string) => {
    const {data} = await movies.get<SearchResponse>(
      `/search/movie?query=${term}`,
    );

    setResults(data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    search(term);
  }, []);

  return {
    search,
    isLoading,
    results,
  };
};
