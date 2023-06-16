package com.project.SpringBootProject.controller;

import com.project.SpringBootProject.bean.FollowerCount;
import com.project.SpringBootProject.service.FollowerCountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/follower_counts")
public class FollowerCountController {
    @Autowired
    private FollowerCountService followerCountService;
    @GetMapping("/{name}")
    @PreAuthorize("hasAnyAuthority('admin','normal','premium')")
    public List<FollowerCount> getByCompany(@PathVariable String name)
    {
        return followerCountService.getFollowerByName(name);
    }
    @GetMapping("/{name}/{date}")
    @PreAuthorize("hasAnyAuthority('admin','normal','premium')")
    public List<FollowerCount> getByCompanyAndDate(@PathVariable String name, @PathVariable Date date){
        return followerCountService.getFollowerByCompanyAndDate(name, date);
    }


}
