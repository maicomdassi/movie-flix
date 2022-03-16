package com.devsuperior.movieflix.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.MovieListDTO;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.controllers.MovieController;
import com.devsuperior.movieflix.controllers.ReviewController;

@RestController
@RequestMapping(value = "/movies")
public class MovieResources {

	
	@Autowired
	MovieController controller;
	
	@Autowired
	ReviewController reviewController;
	
	@GetMapping
	public ResponseEntity<Page<MovieListDTO>> find(
			@RequestParam(value = "genreId", defaultValue = "0") Long genreId,
			Pageable pageable) {
		
		Page<MovieListDTO> list = controller.findAllPaged(genreId, pageable);		
		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<MovieDTO> findById(@PathVariable Long id) {
		MovieDTO dto = controller.findById(id);
		return ResponseEntity.ok().body(dto);
	}	
	
	@GetMapping(value = "/movies/{id}/reviews")
	public ResponseEntity<List<ReviewDTO>> findAllReview()
	{	
		List<ReviewDTO> list = reviewController.findAllReview(); 
		return ResponseEntity.ok().body(list);
	}

}
