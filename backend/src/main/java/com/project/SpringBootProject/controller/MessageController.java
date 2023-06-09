package com.project.SpringBootProject.controller;

import com.project.SpringBootProject.bean.Message;
import com.project.SpringBootProject.http.Response;
import com.project.SpringBootProject.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('admin')")
    public List<Message> getAll(){
        return messageService.getAll();
    }

    @PostMapping
    @PreAuthorize("permitAll()")
    public Response addMessage(@RequestBody Message message) {
        return messageService.save(message);
    }

    @PostMapping("/handle")
    @PreAuthorize("hasAnyAuthority('admin')")
    public Response handleMsg(@RequestBody Integer id){
        return messageService.handleMsg(id);
    }

    @DeleteMapping
    @PreAuthorize("hasAnyAuthority('admin')")
    public Response deleteMessage(@RequestBody Integer id){
        return messageService.delete(id);
    }
}
