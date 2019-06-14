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
    public Company createNewCompany(Company company) {
        if(companyRepository.findCompaniesByName(company.getName()) != null){
            return null;
        } else {
            company.setCreateDate(LocalDateTime.now().toString());
            company.setStatus("active");
            return companyRepository.save(company);
        }
    }

    @Override
    public Company updateCompany(Company company) {
        company.setUpdateDate(LocalDateTime.now().toString());
        company.setUpdatedBy("cuongdq");
        return companyRepository.save(company);
    }

    @Override
    public Company deleteCompany(Company company) {
        company.setStatus("inactive");
        return companyRepository.save(company);
    }
}
