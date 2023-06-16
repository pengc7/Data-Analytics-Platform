package com.mercury.SpringBootProject.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.mercury.SpringBootProject.dao.UserDao;
import com.mercury.SpringBootProject.http.AuthenticationSuccessResponse;
import com.mercury.SpringBootProject.http.Response;

import java.lang.reflect.Type;
import java.util.Map;

@Service
public class AuthService {
	
	@Autowired
	private UserDao userDao;

	public Response checklogin(Authentication authentication) {
		if (authentication != null) {
			Response response = new AuthenticationSuccessResponse(true, 200, "Logged In!", userDao.findByUsername(authentication.getName()));
			return response;
		} else {
			return new Response(false);
		}
	}

}
