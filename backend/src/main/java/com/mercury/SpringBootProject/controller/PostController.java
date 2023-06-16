package com.mercury.SpringBootProject.controller;

import com.mercury.SpringBootProject.bean.FollowerCount;
import com.mercury.SpringBootProject.bean.Post;
import com.mercury.SpringBootProject.dao.CompanyDao;
import com.mercury.SpringBootProject.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/{name}")
    @PreAuthorize("hasAnyAuthority('admin','premium','normal')")
    public List<Post> getByCompany(@PathVariable String name){
        return postService.getFollowerByCompany(name);
    }

    @GetMapping("/{name}/{date}")
    @PreAuthorize("hasAnyAuthority('admin','normal','premium')")
    public List<Post> getByCompanyAndDate(@PathVariable String name, @PathVariable Date date){
        return postService.getFollowerByCompanyAndDate(name, date);
    }

}
