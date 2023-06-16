package com.mercury.SpringBootProject.service;

import com.mercury.SpringBootProject.bean.Company;
import com.mercury.SpringBootProject.bean.Message;
import com.mercury.SpringBootProject.dao.MessageDao;
import com.mercury.SpringBootProject.email.EmailService;
import com.mercury.SpringBootProject.http.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    @Autowired
    private MessageDao messageDao;
    @Autowired
    private EmailService emailService;
    public List<Message> getAll(){
        return messageDao.findAll();
    }

    public Response save(Message msg){
        messageDao.save(msg);
        return new Response(true);
    }

    public Response delete(Integer id){
        Optional<Message> msg = messageDao.findById(id);
        if (msg.isPresent()) {
            messageDao.deleteById(id);
            return new Response(true);
        }
        return new Response(false);
    }

    public Response handleMsg(Integer id){
        Optional<Message> findMsg = messageDao.findById(id);
        if (findMsg.isPresent()) {
           Message msg = findMsg.get();
           String subject = "Regarding your message";
           String email = msg.getEmail();
           String message = "Hi "+msg.getUsername()+","+ "\n" +"Your message has been received. We would like to offer solutions as below...";
           emailService.sendEmail(email, subject, message);
           return new Response(true);
        } else {
            return new Response(false);
        }
    }

}
