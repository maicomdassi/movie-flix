import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { Review } from 'types/review';
import { requestBackend } from 'util/requests';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

type FormData = {
  movieId: number;
  text: string;
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      data: formData,
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        setValue('text', '');
        console.log('REVIEW SALVO COM SUCESSO', response);
        onInsertReview(response.data);
      })
      .catch((error) => {
        console.log('ERRO AO SALVAR REVIEW', error);
      });
  };

  return (
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
  );
};

export default ReviewForm;
