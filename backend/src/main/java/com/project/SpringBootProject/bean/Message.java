package com.project.SpringBootProject.bean;


import javax.persistence.*;

@Entity
@Table(name="message")
public class Message {
    @Id
    @SequenceGenerator(name = "message_id_seq", sequenceName = "message_id_seq", allocationSize = 1)
    @GeneratedValue(generator="message_id_seq", strategy = GenerationType.AUTO)
    private int id;
    @Column
    private String username;
    @Column
    private String email;
    @Column
    private String message;
    @Column
    private long timestmp;

    public Message() {
    }

    public Message(int id, String username, String email, String message, long timestmp) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.message = message;
        this.timestmp = timestmp;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public long getTimestmp() {
        return timestmp;
    }

    public void setTimestmp(long timestmp) {
        this.timestmp = timestmp;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", message='" + message + '\'' +
                ", timestmp=" + timestmp +
                '}';
    }
}
