import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Review } from 'types/review';
import { requestBackend } from 'util/requests';
import './styles.css'

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
        toast.info('Review salvo com sucesso!');
        onInsertReview(response.data);
      })
      .catch((error) => {
        toast.info('Erro ao tentar salvar o review!');        
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
        <div className="review-submit">
          <button className="btn-review btn-primary btn-lg" type="submit">
            SALVAR AVALIAÇÃO
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
