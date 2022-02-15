import { AxiosRequestConfig } from 'axios';
import MoviesRating from 'components/MovieRating';
//import MoviesRating from 'components/MovieRating';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from 'types/movie';
import { Review } from 'types/review';
import { hashAnyRoles } from 'util/auth';
//import { Review } from 'types/review';
import { BASE_URL, requestBackend } from 'util/requests';
import './styles.css';

type UrlParms = {
  movieId: string;
};

const MovieDatails = () => {
  const { movieId } = useParams<UrlParms>();

  console.log(movieId);
  const [movie, setMovie] = useState<Movie>();
  const [reviews, setReviews] = useState<Review[]>();
  //const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => {
        console.log('teste');
        setReviews(response.data);
      })
      .finally(() => {
        console.log(requestBackend(params));
      });
  }, [movieId]);

  return (
    <div className="movie-container">
      <h1>Tela detalhes do filme id: {movieId} </h1>

      {hashAnyRoles(['ROLE_MEMBER']) && (
        <div className="base-card movie-rate">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                type="text"
                className="form-control base-input"
                placeholder="Deixe sua avaliação aqui"
                name="movieRate"
              />
            </div>
            <div className="login-submit">
              <button className="btn btn-primary btn-lg" type="submit">
                SALVAR AVALIAÇÃO
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="base-card movie-rating">
        {reviews?.map((item) => (
          <MoviesRating key={item.id} name={item.user.name} rate={item.text} />
        ))}
      </div>

      <div></div>
    </div>
  );
};

export default MovieDatails;
