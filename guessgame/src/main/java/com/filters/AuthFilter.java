package com.filters;

import java.io.IOException;
import java.util.ArrayList;

import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

//@Component
public class AuthFilter implements Filter {
	
	public AuthFilter() {
		publicUrl = new ArrayList<>();
		publicUrl.add("/signin");
		publicUrl.add("/signup");
		publicUrl.add("/forgot");
	}
	
	ArrayList<String> publicUrl;
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		HttpSession session = httpRequest.getSession(false);
		boolean status = true;
		System.out.println(httpRequest.getRequestURI());
		if(!publicUrl.contains(httpRequest.getRequestURI().toLowerCase())) {
			if(session != null && session.getAttribute("user") != null) {
				String role = (String) session.getAttribute("role");
				
				if (role.equals("USER") || role.equals("ADMIN")) {
					status = true;
				} else {
					status = false;
				}
			} else {
				status = false;
			}
		} 
		else {
			System.out.println("public url");
		}
		if(status) {
			chain.doFilter(httpRequest, httpResponse);
		}
		else {
			request.getRequestDispatcher("signin").forward(httpRequest, httpResponse);
		}
		
	}
}
