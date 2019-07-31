package com.hs.heatmap.repository;

import com.hs.heatmap.model.Account;
import com.hs.heatmap.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account,Integer> {

    //Get all Account had role 'Managee'
    @Query("SELECT a FROM Account a WHERE a.role = false")
    List<Account> getAccountByRole();

    //Search Account by Username or Fullname
    @Query("SELECT a FROM Account a WHERE " +
            "(LOWER(a.fullName) like %:searchValue% or a.username like %:searchValue%) and a.role = false")
    List<Account> searchByUsernameOrFullname(@Param("searchValue") String searchValue);

    Account findByUsername(String username);

    //Find account by ID
    Account findAccountById(Integer id);

    Account findAccountByUsername(String name);

    @Query("SELECT a.account FROM AccountStore a WHERE a.sto_id = :id")
    List<Account> findAccountByStore(@Param("id")int id);

    //Find account by company
    @Query("SELECT a FROM Account a WHERE a.cpn_acc_id = :id and a.role = false")
    List<Account> findAccountByCompany(int id);

}

