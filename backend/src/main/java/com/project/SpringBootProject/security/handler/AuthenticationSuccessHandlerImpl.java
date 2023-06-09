package com.project.SpringBootProject.security.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.project.SpringBootProject.bean.User;
import com.project.SpringBootProject.dao.UserDao;
import com.project.SpringBootProject.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationSuccessHandlerImpl extends SimpleUrlAuthenticationSuccessHandler {
	@Autowired
	private UserDao userDao;
	private User user;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		this.user = userDao.findByUsername(request.getParameter("username"));
/*
		String cookieName = "myCookie";
		String cookieValue = "myValue";
		String cookieDomain = "example.com";
		String cookiePath = "/";
		int cookieMaxAge = 3600;
		boolean cookieSecure = true;
		boolean cookieHttpOnly = true;
		String cookieSameSite = "Lax";

		StringBuilder cookieBuilder = new StringBuilder();
		cookieBuilder.append(cookieName).append("=").append(cookieValue).append(";");
		cookieBuilder.append("Domain=").append(cookieDomain).append(";");
		cookieBuilder.append("Path=").append(cookiePath).append(";");
		cookieBuilder.append("Max-Age=").append(cookieMaxAge).append(";");
		if (cookieSecure) {
			cookieBuilder.append("Secure;");
		}
		if (cookieHttpOnly) {
			cookieBuilder.append("HttpOnly;");
		}
		cookieBuilder.append("SameSite=").append(cookieSameSite);

		response.setHeader("Set-Cookie", cookieBuilder.toString());*/

/*
		String cookie = request.getHeader("Set-Cookie");
		cookie = cookie+ ";SameSite=Lax";
		response.setHeader("Set-Cookie", cookie);*/

		SecurityUtils.sendResponse(response, HttpServletResponse.SC_OK, "Login successfully.", null, this.user);

	}
}



