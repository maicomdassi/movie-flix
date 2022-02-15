import { ReactComponent as AuthImage} from 'assets/images/star.svg';
import './styles.css';

type Props = {
  name: string;
  rate: string;
}

const MoviesRating = () => {
  return (
    <div className="rating-container">
        <div className='rating-name'>
        <AuthImage />
        <h2>Maria Silva</h2>
        </div>

        <p>Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.</p>

    </div>
  );
};

export default MoviesRating;