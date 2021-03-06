package com.devsuperior.movieflix.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.devsuperior.movieflix.entities.Review;

public class ReviewDTO  implements Serializable {
	private static final long serialVersionUID = 1L;


	private Long id;
	
	@NotBlank(message = "Campo requerido")
	private String text;	
	private Long movieId;
	private UserDTO user;
	
	public ReviewDTO() {}

	
	
	public ReviewDTO(Long id, String text, UserDTO user, Long movieId) {
		super();
		this.id = id;
		this.text = text.trim();
		this.user = user;
		this.movieId = movieId;
	}

	public ReviewDTO(Review entity) {
		id = entity.getId();
		text = entity.getText().toString();
		user = new UserDTO(entity.getUser());
		movieId = entity.getMovie().getId();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text.trim();
	}


	public UserDTO getUser() {
		return user;
	}



	public Long getMovieId() {
		return movieId;
	}


	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}
	
	
}
