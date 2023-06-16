package com.project.SpringBootProject.email;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
@RequiredArgsConstructor
public class EmailService {

    @Autowired
    private final JavaMailSender javaMailSender;

    //@Async
    public void sendEmail(String toEmail, String subject, String message){
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(toEmail);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        mailMessage.setFrom("pengch336@gmail.com");
        javaMailSender.send(mailMessage);
    }
}
