import axios, { AxiosRequestConfig } from 'axios';
import MovieCard from 'components/MovieCard';
import ReviewForm from 'components/ReviewForm';
import ReviewListing from 'components/ReviewListing';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from 'types/movie';
import { Review } from 'types/review';
import { hashAnyRoles } from 'util/auth';
import { BASE_URL, requestBackend } from 'util/requests';
import CardLoader from '../MoviesCatalog/CardLoader';

import './styles.css';

type UrlParms = {
  movieId: string;
};

const MovieDatails = () => {
  const { movieId } = useParams<UrlParms>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [movie, setMovie] = useState<Movie>();
  const [isLoading, setLoading] = useState(false);
/* 
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/movies/${movieId}`)
      .then((response) => {
        setMovie(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]); */

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => {
        setMovie(response.data);
      })
      .finally(() => {
        setLoading(false);
        console.log(requestBackend(params));
      });
  }, [movieId]);


  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => {
        setReviews(response.data);
      })
      .finally(() => {
        console.log(requestBackend(params));
      });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  };

  return (
    <div className="movie-container">
      {isLoading ? <CardLoader/> :
      movie && <MovieCard movie={movie} synopsis={true} />}   

      {hashAnyRoles(['ROLE_MEMBER']) && (
        <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
      )}
      <ReviewListing reviews={reviews} />

    </div>
  );
};

export default MovieDatails;
