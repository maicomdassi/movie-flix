import { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Review } from "types/review";
import { requestBackend } from "util/requests";

type Props = {
    movieId: string;   
  };


const ReviewForm = ({ movieId }: Props) => {

    const [reviews, setReviews] = useState<Review[]>();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Review>();


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

    return(

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
    )
}

export default ReviewForm;