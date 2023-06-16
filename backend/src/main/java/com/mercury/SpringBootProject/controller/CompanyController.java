package com.mercury.SpringBootProject.controller;

import com.mercury.SpringBootProject.bean.Company;
import com.mercury.SpringBootProject.dao.CompanyDao;
import com.mercury.SpringBootProject.http.Response;
import com.mercury.SpringBootProject.service.CompanyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/companies")
public class CompanyController {
    @Autowired
    private CompanyService companyService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('admin', 'premium','normal')")
    public List<Company> getAll(){
        return companyService.getAll();
    }

    @GetMapping("/{company_name}")
    @PreAuthorize("hasAnyAuthority('admin', 'premium','normal')")
    public Company getByName(@PathVariable String company_name){
        return companyService.getCompanyByName(company_name);
    }

    /*@PostMapping
    public Response save(@RequestBody Company company) {
        return companyService.save(company);
    }
*/
    @DeleteMapping("/{company_name}")
    @PreAuthorize("hasAuthority('admin')")
    public Response delete(@PathVariable String company_name){
        companyService.deleteCompanyByName(company_name);
        return new Response(true, "Company "+company_name+" is deleted!");
    }
}
