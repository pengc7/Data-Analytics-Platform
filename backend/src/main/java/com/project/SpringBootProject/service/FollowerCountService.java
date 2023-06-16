package com.project.SpringBootProject.service;

import com.project.SpringBootProject.bean.FollowerCount;
import com.project.SpringBootProject.dao.FollowerCountDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class FollowerCountService {
    @Autowired
    private FollowerCountDao followerCountDao;

    public List<FollowerCount> getFollowerByName(String name){
        return followerCountDao.findByName(name);
    }

    public List<FollowerCount> getFollowerByCompanyAndDate(String name, Date date){
        return followerCountDao.findByNameAndDate(name, date);
    }

}
