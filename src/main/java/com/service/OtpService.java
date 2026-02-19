package com.service;

import org.springframework.stereotype.Service;

@Service
public class OtpService {
	
	public String generateOtp(int n) {
		String s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		StringBuffer buffer = new StringBuffer();
		int index;
		for(int i = 0; i < n; i++) {
			index = (int)(Math.random() * s.length());
			buffer.append(s.charAt(index));
		}
		
		return buffer.toString();
	}
}
