package com.filters;

import java.io.IOException;

import org.springframework.stereotype.Component;

import com.entity.UserEntity;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

//@Component
public class AdminFilter implements Filter {
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		HttpSession session = httpRequest.getSession(false);
		boolean status = true;
		// login
		// admin
		if (httpRequest.getRequestURI().toLowerCase().contains("admin")) {

			if (session != null && session.getAttribute("user") != null) {
				UserEntity user = (UserEntity) session.getAttribute("user");
				String role = user.getRole();
				if (role.equals("ADMIN")) {
					status = true;
				} else {
					// login
					status = false;
				}
			} else {
				status = false;
			}
		}
		// signup
		if (status == true) {
			chain.doFilter(httpRequest, httpResponse);// go ahead
		} else {
			request.getRequestDispatcher("signin").forward(httpRequest, httpResponse);
		}
	}
}

//filter folder 
//AdminFilter implements Filter 
//logic -> doFilter 
//@component 
