import { ReactComponent as AuthImage } from 'assets/images/star.svg';
import { Review } from 'types/review';
import './styles.css';

type Props = {
  reviews: Review[];
};

const MovieReviews = ({ reviews }: Props) => {
  return (
    <div className="base-card movie-rating">
      {reviews?.map((review) => (
        <div className="rating-container" key={review.id}>
          <div className="rating-name">
            <AuthImage />
            <h2>{review.user.name}</h2>
          </div>
          <p>{review.text}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieReviews;
