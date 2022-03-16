package com.devsuperior.movieflix.controllers;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.MovieListDTO;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.controllers.exceptions.ResourceNotFoundException;
import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.repositories.GenreRepository;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;

@Service
public class MovieController {
	
	@Autowired
	private MovieRepository repository;

	@Autowired
	private GenreRepository genreRepository;
	
	@Autowired
	ReviewRepository reviewRepository;
	
	@Transactional(readOnly = true)
	public Page<MovieListDTO> findAllPaged(Long GenreId, Pageable pageable) {
		List<Genre> genreList = (GenreId == 0) ? null : Arrays.asList(genreRepository.getOne(GenreId));
		Page<Movie> page = repository.find(genreList, pageable);
		
		return page.map(x -> new MovieListDTO(x));
	}
	
	@Transactional(readOnly = true)
	public MovieDTO findById(Long id) {
		Optional<Movie> obj = repository.findById(id);
		Movie entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new MovieDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public List<ReviewDTO> findAllReview() {
		List<Review> list =  reviewRepository.findAll();				
		return list.stream().map(x -> new ReviewDTO(x)).collect(Collectors.toList());		
	}
	
	
}
