package com.mercury.SpringBootProject.service;

import com.mercury.SpringBootProject.bean.Company;
import com.mercury.SpringBootProject.dao.CompanyDao;
import com.mercury.SpringBootProject.http.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
