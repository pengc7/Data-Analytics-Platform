package com.project.SpringBootProject.dao;

import com.project.SpringBootProject.bean.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageDao extends JpaRepository<Message, Integer> {

}
