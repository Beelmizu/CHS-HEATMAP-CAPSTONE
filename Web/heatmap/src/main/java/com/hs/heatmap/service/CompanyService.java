package com.hs.heatmap.service;

import com.hs.heatmap.model.Company;

import java.util.List;

public interface CompanyService {

    List<Company> getAllCompanies();

    Company getDetailCompany(int id);

    List<Company> getCompanyByName(String searchValue);

    boolean createNewCompany(Company company);

    boolean updateCompany(Company company);

    boolean inactiveCompany(Company company);

    boolean activeCompany(Company company);

}
