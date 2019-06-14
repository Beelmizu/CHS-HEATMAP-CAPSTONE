package com.hs.heatmap.controller;

import com.hs.heatmap.model.Company;
import com.hs.heatmap.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200")
public class CompanyController {

    @Autowired
    CompanyService companyService;

    @GetMapping("/companies/getAll")
    public List<Company> getAllCompanies(){ return companyService.getAllCompanies(); }

    @GetMapping("/companies/getDetail/{id}")
    public Company getDetailCompany(@PathVariable(value = "id") int id){ return companyService.getDetailCompany(id); }

    @GetMapping("/companies/search/{searchValue}")
    public List<Company> searchCompany(@PathVariable(value = "searchValue") String searchValue) { return companyService.getCompanyByName(searchValue); }

    @DeleteMapping("/companies/delete")
    public Company deleteCompany(@RequestBody Company company) { return companyService.deleteCompany(company); }

    @PostMapping("/companies/update")
    public Company updateCompany(@RequestBody Company company) { return companyService.updateCompany(company); }

    @PostMapping("/companies/create")
    public Company createCompany(@RequestBody Company company) { return companyService.createNewCompany(company); }

}
