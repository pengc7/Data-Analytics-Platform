package com.project.SpringBootProject.dao;

import com.project.SpringBootProject.bean.FollowerCount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface FollowerCountDao extends JpaRepository<FollowerCount, Integer> {
    List<FollowerCount> findByName(String name);
    List<FollowerCount> findByNameAndDate(String name, Date date);
}
