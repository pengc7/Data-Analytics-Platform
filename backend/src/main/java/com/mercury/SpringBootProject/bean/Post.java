package com.mercury.SpringBootProject.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="post")
public class Post {
    @Id
    private int id;
   /* @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    private Company company;
*/
    @Column
    private String name;
    @Column
    private Date date;
    @Column
    private String post_type;
    @Column
    private int number_of_engagement;

    public Post() {
    }

    public Post(int id, String name, Date date, String post_type, int number_of_engagement) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.post_type = post_type;
        this.number_of_engagement = number_of_engagement;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getPost_type() {
        return post_type;
    }

    public void setPost_type(String post_type) {
        this.post_type = post_type;
    }

    public int getNumber_of_engagement() {
        return number_of_engagement;
    }

    public void setNumber_of_engagement(int number_of_engagement) {
        this.number_of_engagement = number_of_engagement;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", date=" + date +
                ", post_type='" + post_type + '\'' +
                ", number_of_engagement=" + number_of_engagement +
                '}';
    }
}