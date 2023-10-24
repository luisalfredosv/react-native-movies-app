import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODUzNDg3OWE2MzBlZjZlMTIzZjlkZTFhZGRlZDRiYyIsInN1YiI6IjVmZGNiNWMzY2Y0OGExMDA0MTQ5NjVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TcspRK-kpQRjXVh4Qz9UFHBsooddaEsTnJ4yYhdYHbU';

const movies = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    language: 'es-ES',
  },
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

movies.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error('Se produjo un error:', error);
    return Promise.reject(error);
  },
);

export default movies;
