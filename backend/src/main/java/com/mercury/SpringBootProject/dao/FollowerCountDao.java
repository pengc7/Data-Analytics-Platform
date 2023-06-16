package com.mercury.SpringBootProject.dao;

import com.mercury.SpringBootProject.bean.Company;
import com.mercury.SpringBootProject.bean.FollowerCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface FollowerCountDao extends JpaRepository<FollowerCount, Integer> {
    List<FollowerCount> findByName(String name);
    List<FollowerCount> findByNameAndDate(String name, Date date);
}
