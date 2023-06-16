package com.mercury.SpringBootProject.dao;

import com.mercury.SpringBootProject.bean.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, Integer>{
    User findByUsername(String username);
}
