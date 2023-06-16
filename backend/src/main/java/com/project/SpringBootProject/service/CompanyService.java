package com.project.SpringBootProject.service;

import com.project.SpringBootProject.bean.Company;
import com.project.SpringBootProject.dao.CompanyDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {
    @Autowired
    private CompanyDao companyDao;
    public List<Company> getAll(){
        return companyDao.findAll();
    }

    public Company getCompanyByName(String company_name){
        return companyDao.findByName(company_name);
    }

    /*public Response save(Company company){
        companyDao.save(company);
        return new Response(true);
    }*/
    public void deleteCompanyByName(String name){
        companyDao.deleteByName(name);
    }
}
