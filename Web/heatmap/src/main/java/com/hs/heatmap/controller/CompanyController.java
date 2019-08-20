package com.hs.heatmap.controller;

import com.hs.heatmap.model.Company;
import com.hs.heatmap.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CompanyController {

    @Autowired
    CompanyService companyService;

    @GetMapping("/company/getAll")
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @GetMapping("/company/getDetail/{id}")
    public Company getDetailCgetompany(@PathVariable(value = "id") int id) {
        return companyService.getDetailCompany(id);
    }

    @GetMapping("/company/search/{searchValue}")
    public List<Company> searchCompany(@PathVariable(value = "searchValue") String searchValue) {
        return companyService.getCompanyByName(searchValue);
    }

    @PostMapping("/company/inactive")
    public boolean inactiveCompany(@RequestBody Company company) {
        return companyService.inactiveCompany(company);
    }

    @PostMapping("/company/active")
    public boolean activeCompany(@RequestBody Company company) {
        return companyService.activeCompany(company);
    }

    @PostMapping("/company/update")
    public boolean updateCompany(@RequestBody Company company) {
        return companyService.updateCompany(company);
    }

    @PostMapping("/company/create")
    public boolean createCompany(@RequestBody Company company) {
        return companyService.createNewCompany(company);
    }

}
