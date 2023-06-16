package com.mercury.SpringBootProject.dao;

import com.mercury.SpringBootProject.bean.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyDao extends JpaRepository<Company, String> {
    Company findByName(String name);
    void deleteByName(String name);
}
