package com.project.SpringBootProject.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.project.SpringBootProject.bean.User;
import com.project.SpringBootProject.bean.UserType;
import com.project.SpringBootProject.dao.UserDao;
import com.project.SpringBootProject.http.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public List<User> getAll() {
		return userDao.findAll();
	}
	
	public Response register(User user) {
		User u = userDao.findByUsername(user.getUsername());
		if (u != null){
			return new Response(false);
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		
		List<UserType> types = new ArrayList<UserType>();
		
		types.add(new UserType(3));
		user.setTypes(types);
		
		userDao.save(user);
		return new Response(true, user);
	}

	public Response upgrade(User user, Authentication authentication){
		if(user.getUsername().equals(authentication.getName()) || isAdmin(authentication.getAuthorities())) {
			User u = userDao.findByUsername(user.getUsername());
			if (u.getTypes().contains(2)){
				return new Response(false);
			}
			u.addTypes(new UserType(2));
			userDao.save(u);
			return new Response(true, u);
	}	else {
			return new Response(false);
		}}

	
	public Response changePassword(User user, Authentication authentication) {
		if(user.getUsername().equals(authentication.getName()) || isAdmin(authentication.getAuthorities())) {
			User u = userDao.findByUsername(user.getUsername());
			u.setPassword(passwordEncoder.encode(user.getPassword()));
			userDao.save(u);
		}else {
			//TODO: Not authorize to update password if not current loggedin user or admin.
			return new Response(false);
		}
		return new Response(true);
	}
	
	public boolean isAdmin(Collection<? extends GrantedAuthority> profiles) {
		boolean isAdmin = false;
		for(GrantedAuthority profle: profiles) {
			if(profle.getAuthority().equals("ROLE_ADMIN")) {
				isAdmin = true;
			}
		};
		return isAdmin;
	}
	
	public Response deleteUser(int id) {
		if(userDao.findById(id).get() != null) {
			userDao.deleteById(id);
			return new Response(true);
		}else {
			return new Response(false, "User is not found!");
		}
	}
}
