package com.project.SpringBootProject.dao;

import com.project.SpringBootProject.bean.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface PostDao extends JpaRepository<Post, Integer> {
    List<Post> findByName(String name);
    List<Post> findByNameAndDate(String name, Date date);
}
