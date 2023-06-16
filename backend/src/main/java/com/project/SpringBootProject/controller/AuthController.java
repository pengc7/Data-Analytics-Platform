package com.project.SpringBootProject.controller;

import com.project.SpringBootProject.http.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.SpringBootProject.service.AuthService;

@RestController
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	@GetMapping("/checklogin")
	public Response checklogin(Authentication authentication) {
		return authService.checklogin(authentication);
	}
}
