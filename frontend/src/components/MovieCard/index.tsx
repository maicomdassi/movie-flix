import './styles.css';
import { Movie } from 'types/movie';

type Props = {
  movie: Movie;
  synopsis?: boolean;
};
const MovieCard = ({ movie, synopsis = false }: Props) => {
  return (
    <div className= {synopsis ? "base-card movie-card-completo" : "base-card movie-card" }>
    <div className= { synopsis ? "card-top-container-completo" : "card-top-container" } >
      <img src={movie.imgUrl} alt={movie.title} />
    </div>
    <div className= {synopsis ? "card-bottom-container-completo" : "card-bottom-container" }>
      <h2>{movie.title}</h2>
      <h3>{movie.year}</h3>
      <span>{movie.subTitle}</span>
      {synopsis ? (
        <div className= "card-synopsis-container">
          <span>{movie.synopsis}</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  </div>
  );
};

export default MovieCard;
