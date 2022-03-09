
import { AxiosRequestConfig } from 'axios';
import MovieCard from 'components/MovieCard';
import MovieFilter, { MovieFilterData } from 'components/MovieFilter';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import CardLoader from './CardLoader';
import './styles.css';

let movieid = 1;

type ControlComponentsData = {
  activePage: number;
  filterData: MovieFilterData;
};

const MoviesCatalog = () => {


  const [page, setPage] = useState<SpringPage<Movie>>();
  const [isLoading, setLoading] = useState(false);
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: {genre: null}
    });

    const handlePageChange = (pageNumber: number) => {
      setControlComponentsData({ activePage: pageNumber, filterData: controlComponentsData.filterData });
    };

  const handleSubmitFilter = (data: MovieFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  }

  const getMovies = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true, 
      params: {
        page: controlComponentsData.activePage,
        size: 4,       
        genreId: controlComponentsData.filterData.genre?.id
      },
    };
    setLoading(true);
    requestBackend(config).then((response) => {
      console.log(config);
      setPage(response.data);
    })
    .finally(() => {
      setLoading(false)
    });
  }, [controlComponentsData]);
  
    useEffect(() => {
      getMovies();
    }, [getMovies]);


  return (
    <div className="container my-4 movies-container">
      <MovieFilter onSubmitFilter={handleSubmitFilter}/>

      <div className="row">
        {isLoading ? <CardLoader/> : 
        (page?.content.map((movie) => (
          <div className="col-sm-6 col-lg-4 col-xl-3" key={movie.id}>
            <Link to= {`/movies/${movie.id}`}>
              <MovieCard movie={movie} />
            </Link>
          </div>
        )))}
      </div>
      <div className="row">
      <Pagination
      forcePage={page?.number}
        pageCount={page ? page.totalPages : 0}
        range={3}
        onChange={handlePageChange}
      />
      </div>
    </div>
  );
};

export default MoviesCatalog;