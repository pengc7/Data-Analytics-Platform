package com.project.SpringBootProject.dao;

import com.project.SpringBootProject.bean.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, Integer>{
    User findByUsername(String username);
}
