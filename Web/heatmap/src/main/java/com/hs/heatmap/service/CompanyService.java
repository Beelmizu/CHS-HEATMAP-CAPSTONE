package com.hs.heatmap.service;

import com.hs.heatmap.model.Company;

import java.util.List;

public interface CompanyService {

    List<Company> getAllCompanies();

    Company getDetailCompany(int id);

    List<Company> getCompanyByName(String searchValue);

    Company createNewCompany(Company company);

    Company updateCompany(Company company);

    Company inactiveCompany(Company company);

    Company activeCompany(Company company);

}
