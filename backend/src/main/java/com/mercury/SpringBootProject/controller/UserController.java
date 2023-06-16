package com.mercury.SpringBootProject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.mercury.SpringBootProject.bean.User;
import com.mercury.SpringBootProject.http.Response;
import com.mercury.SpringBootProject.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@PreAuthorize("hasAuthority('admin')")
	@GetMapping
	public List<User> getAll() {
		return userService.getAll();
	}
	
	@PreAuthorize("permitAll()")
	@PostMapping("/register")
	public Response addUser(@RequestBody User user) {
		return userService.register(user);
	}

	@PutMapping
	@PreAuthorize("hasAnyAuthority('normal','admin')")
	public Response upgradeUser(@RequestBody User user, Authentication authentication) {
		return userService.upgrade(user, authentication);
	}

/*	@PutMapping
	@PreAuthorize("hasAnyAuthority('normal', 'admin','premium')")
	public Response changeUser(@RequestBody User user, Authentication authentication) {
		return userService.changePassword(user, authentication);
	}*/
	
	@PreAuthorize("hasAuthority('admin')")
	@DeleteMapping("/{id}")
	public Response deleteUser(@PathVariable int id) {
		return userService.deleteUser(id);
	}
}
