import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Genre } from 'types/genre';
import { requestBackend } from 'util/requests';
import './styles.css';

export type MovieFilterData = {
  genre: Genre | null;
};

type Props = {
    onSubmitFilter : (data: MovieFilterData) => void;
}

const MovieFilter = ({ onSubmitFilter } : Props) => {

const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

const { handleSubmit, setValue, getValues, control } =
useForm<MovieFilterData>();

useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/genres',
      withCredentials: true,
    };
    requestBackend(params)
      .then((response) => {
        setSelectGenres(response.data);       
      })}, []);

  const onSubmit = (formData: MovieFilterData) => {
    onSubmitFilter(formData);
  };

  const handleChangeGenre = (value: Genre) => {
    setValue('genre',value);
    
    const obj = {    
      genre: getValues('genre')
    }
    onSubmitFilter(obj);
  }

  return (
    <div className="base-card movie-filter-container">
      <form  onSubmit={handleSubmit(onSubmit)} className="movie-filter-form">
        <div className="movie-filter-genre-conatiner">
          <Controller
            name="genre"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={selectGenres}
                classNamePrefix="movie-filter-select"
                isClearable
                placeholder="Gênero"
                getOptionLabel={(genre: Genre) => genre.name}
                getOptionValue={(genre: Genre) => String(genre.id)}
                onChange={(value) => handleChangeGenre(value as Genre)} 
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default MovieFilter;
