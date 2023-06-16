package com.mercury.SpringBootProject.dao;

import com.mercury.SpringBootProject.bean.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface MessageDao extends JpaRepository<Message, Integer> {

}
