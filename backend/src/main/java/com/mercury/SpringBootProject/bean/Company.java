package com.mercury.SpringBootProject.bean;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="company")
public class Company {
    @Id
    private String name;

    @Column
    private String logo;

    @Column
    private String descrp;
    @Column
    private String url;
   /* @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "company")
    private List<FollowerCount> followerCountList;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "company")
    private List<Post> postList;*/

    public Company(){}

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public Company(String name, String descrp, String url) {
        this.name = name;
        this.logo=logo;
        this.descrp = descrp;
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescrp() {
        return descrp;
    }

    public void setDescrp(String descrp) {
        this.descrp = descrp;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }


    @Override
    public String toString() {
        return "Company{" +
                "name='" + name + '\'' +
                ", logo='" + logo + '\'' +
                ", descrp='" + descrp + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
