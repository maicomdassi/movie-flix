import { AxiosRequestConfig } from 'axios';
import MoviesRating from 'components/MovieRating';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Movie } from 'types/movie';
import { Review } from 'types/review';
import { hashAnyRoles } from 'util/auth';
import {  requestBackend } from 'util/requests';

import './styles.css';

type UrlParms = {
  movieId: string;
};

type LocationState = {
  from: string;
};

const MovieDatails = () => {

  //const history = useHistory();
  const { movieId } = useParams<UrlParms>(); 
  const [reviews, setReviews] = useState<Review[]>();
/*   const location = useLocation<LocationState>();
  const { from } = location.state || { from: { pathname: `/movies/${movieId}` } }; */
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Review>();


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


  const onSubmit = (formData: Review) => {

    const data = {
      ...formData,
      movieId: movieId,
    };

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: "/reviews",
      data: data,
      withCredentials: true,     
    };

    requestBackend(config)
      .then((response) => {
        console.log(response);
        document.location.reload();
       // history.replace(from);
       //
        })           
      .catch((error) => {
        //setHasError(true);
        console.log('ERRO', error);
      });
  };


  return (
    <div className="movie-container">
      <h1>Tela detalhes do filme id: {movieId} </h1>

      {hashAnyRoles(['ROLE_MEMBER']) && (
        <div className="base-card movie-rate">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
            <input
                  {...register('text', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.text ? 'is-invalid' : ''
                  }`}
                  placeholder="Deixe sua avaliação aqui"
                  name="text"
                />
                <div className="invalid-feedback d-block">
                  {errors.text?.message}{' '}
                </div>    
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
