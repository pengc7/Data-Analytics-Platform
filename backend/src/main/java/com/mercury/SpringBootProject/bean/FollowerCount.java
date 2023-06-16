package com.mercury.SpringBootProject.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
@Entity
@Table(name="follower_count")
public class FollowerCount {
    @Id
    private int id;
    @Column
    private String name;
    @Column
    private Date date;
    @Column
    private int count;

    public FollowerCount() {
    }

    public FollowerCount(int id, String name, Date date, int count) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.count = count;
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

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    @Override
    public String toString() {
        return "FollowerCount{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", date=" + date +
                ", count=" + count +
                '}';
    }
}
