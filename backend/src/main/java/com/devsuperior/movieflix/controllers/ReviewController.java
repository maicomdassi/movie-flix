package com.devsuperior.movieflix.controllers;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;

@Service
public class ReviewController {

	@Autowired
	ReviewRepository repository;
	
	@Autowired
	MovieRepository movieRepository;
		
	@Autowired
	AuthController authController;
	
	
	@Transactional(readOnly = true)
	public List<ReviewDTO> findAllReview() {
		List<Review> list =  repository.findAll();				
		return list.stream().map(x -> new ReviewDTO(x)).collect(Collectors.toList());		
	}
	
	
	@PreAuthorize("hasAnyRole('MEMBER')")
	@Transactional
	public ReviewDTO insert(ReviewDTO dto) {

		Review entity = new Review();
		copyDtoToEntity(dto, entity);		
		entity = repository.save(entity);
		return new ReviewDTO(entity);
	}
	
	private void copyDtoToEntity(ReviewDTO dto, Review entity) {

		entity.setText(dto.getText());		
		entity.setMovie(movieRepository.getOne(dto.getMovieId()));
		entity.setUser(authController.authenticated());
	}
}
