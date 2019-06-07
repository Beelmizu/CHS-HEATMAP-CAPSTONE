package com.hs.heatmap.repository;

import com.hs.heatmap.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {

    //Find Company by ID
    Company findCompaniesById(Integer id);

    //Find company by name
    @Query("SELECT c FROM Company c WHERE LOWER(c.name) like %:searchValue%")
    List<Company> findCompaniesByName(@Param("searchValue") String searchValue);

}
