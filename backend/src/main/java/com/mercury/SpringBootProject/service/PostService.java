package com.mercury.SpringBootProject.service;

import com.mercury.SpringBootProject.bean.Post;
import com.mercury.SpringBootProject.dao.PostDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostDao postDao;

    public List<Post> getFollowerByCompany(String name) {
        return postDao.findByName(name);
    }

    public List<Post> getFollowerByCompanyAndDate(String name, Date date) {
        return postDao.findByNameAndDate(name,date);
    }
}
