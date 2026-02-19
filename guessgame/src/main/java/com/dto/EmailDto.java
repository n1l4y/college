package com.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;


public class EmailDto {
	@Email(message="Must be valid email")
	@NotBlank(message = "Email cannot be blank")
	private String email;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
