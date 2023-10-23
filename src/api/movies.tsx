import axios from 'axios';

const movies = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    language: 'es-ES',
  },
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODUzNDg3OWE2MzBlZjZlMTIzZjlkZTFhZGRlZDRiYyIsInN1YiI6IjVmZGNiNWMzY2Y0OGExMDA0MTQ5NjVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TcspRK-kpQRjXVh4Qz9UFHBsooddaEsTnJ4yYhdYHbU',
  },
});

export default movies;
