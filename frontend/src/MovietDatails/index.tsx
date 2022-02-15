import axios from 'axios';
import MoviesRating from 'components/MovieRating';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from 'types/movie';
import { Review } from 'types/review';
import { BASE_URL } from 'util/requests';
import './styles.css';

type UrlParms = {
  movieId: string;
};

const MovieDatails = () => {

  const { movieId } = useParams<UrlParms>();
  const [movie, setMovie] = useState<Movie>();
  const [reviews, setReviews] = useState<Review[]>();
  //const [isLoading, setLoading] = useState(false);

  useEffect(() => {
   // setLoading(true);
    axios
      .get(`${BASE_URL}/movies/${movieId}`)
      .then((response) => {
        setMovie(response.data);

        axios
        .get(`${BASE_URL}/movies/${movieId}/reviews`)
        .then((response) => {
          setReviews(response.data);
        })

      })
      .finally(() => {
        //setLoading(false);
      });
  }, [movieId]);

  return (
    <div className="movie-container">
         <h1>Tela detalhes do filme id: 1 </h1>

        <div className='base-card movie-rate'>
        <div className="mb-4">
        <input
            type="text"
            className="form-control base-input"
            placeholder="Deixe sua avaliação aqui"
            name="movieRate"
          />
        </div>
        <div className="login-submit">
            <button className="btn btn-primary btn-lg" type="submit">SALVAR AVALIAÇÃO</button>
        </div>
        </div>
             <div className='base-card movie-rating'>
            <MoviesRating/>
            <MoviesRating/>
            <MoviesRating/>
            <MoviesRating/>
            <MoviesRating/>
            <MoviesRating/>
        </div>

        <div>
      {page?.content.map((item) => (
        <p key={item.id}>{item.email}</p>
      ))}
    </div>
    
    </div>
  );
};

export default MovieDatails;