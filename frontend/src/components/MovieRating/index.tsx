import { ReactComponent as AuthImage} from 'assets/images/star.svg';
import './styles.css';

type Props = {
  name: string;
  rate: string;
}

const MoviesRating = ({name,rate} : Props) => {
  return (
    <div className="rating-container">
        <div className='rating-name'>
        <AuthImage />
        <h2>{name}</h2>
        </div>

        <p>{rate}</p>

    </div>
  );
};

export default MoviesRating;