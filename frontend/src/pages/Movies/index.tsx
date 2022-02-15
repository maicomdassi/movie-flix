
import { Link } from 'react-router-dom';
import './styles.css';

let movieid = 1;
let movieid2 = 1;

const Movies = () => {
  return (
    <div className="movies-container">
    
        <h1>Tela listagem de filmes</h1>

        <Link to={`/movies/${movieid}`}>Acessar /movies/1</Link>
        <Link to="/movies/2">Acessar /movies/2</Link>
        <Link to={`/movies`}>Acessar /movies</Link>

    </div>
  );
};

export default Movies;