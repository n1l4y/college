package com.dto;

import jakarta.validation.constraints.Pattern;

public class ResetPassDto {
	private String otp;
	
	private String email;
	
	@Pattern(
	        regexp = "^(?=.*[A-Z]).{8,}$",
	        message = "Password must be at least 8 characters long and contain at least one uppercase letter"
	    )
	private String password1;
	private String password2;
	public String getOtp() {
		return otp;
	}
	public void setOtp(String otp) {
		this.otp = otp;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword1() {
		return password1;
	}
	public void setPassword1(String password1) {
		this.password1 = password1;
	}
	public String getPassword2() {
		return password2;
	}
	public void setPassword2(String password2) {
		this.password2 = password2;
	}
	
	
}
