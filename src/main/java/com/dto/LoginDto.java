package com.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class LoginDto {
	
	@NotBlank(message="Email cannot be empty")
	@Email(message="Must be a valid email")
	private String email;
	
	@Pattern(
	        regexp = "^(?=.*[A-Z]).{8,}$",
	        message = "Password must be at least 8 characters long and contain at least one uppercase letter"
	    )
	private String password;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	
}
