package com.hs.heatmap.implService;

import com.hs.heatmap.model.Account;
import com.hs.heatmap.model.Company;
import com.hs.heatmap.repository.CompanyRepository;
import com.hs.heatmap.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public Company getDetailCompany(int id) {
        return companyRepository.findCompaniesById(id);
    }

    @Override
    public List<Company> getCompanyByName(String searchValue) { return companyRepository.searchCompaniesByName(searchValue); }

    @Override
    public boolean createNewCompany(Company company) {
        Company existedCompany = companyRepository.findCompaniesByName(company.getName());
        if (existedCompany != null) {
            return false;
        } else {
            company.setCreatedDate(LocalDateTime.now().toString());
            company.setStatus("active");
            companyRepository.save(company);
            return true;
        }
    }

    @Override
    public boolean updateCompany(Company company) {
        Company existedCompany = companyRepository.findCompaniesById(company.getId());
        if (existedCompany != null) {
            company.setUpdatedDate(LocalDateTime.now().toString());
            company.setUpdatedBy(company.getUpdatedBy());
            companyRepository.save(company);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean inactiveCompany(Company company) {
        Company existedCompany = companyRepository.findCompaniesById(company.getId());
        if (existedCompany != null) {
            company.setUpdatedDate(LocalDateTime.now().toString());
            company.setUpdatedBy(company.getUpdatedBy());
            company.setStatus("inactive");
            companyRepository.save(company);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean activeCompany(Company company) {
        Company existedCompany = companyRepository.findCompaniesById(company.getId());
        if (existedCompany != null) {
            company.setUpdatedDate(LocalDateTime.now().toString());
            company.setUpdatedBy(company.getUpdatedBy());
            company.setStatus("active");
            companyRepository.save(company);
            return true;
        } else {
            return false;
        }
    }
}
