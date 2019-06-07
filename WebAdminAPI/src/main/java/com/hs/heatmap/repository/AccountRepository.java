package com.hs.heatmap.repository;

import com.hs.heatmap.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account,Integer> {

    //Get all Account had role 'Managee'
    @Query("SELECT a FROM Account a WHERE a.role = false")
    List<Account> getAccountByRole();

    //Search Account by Username or Fullname
    @Query("SELECT a FROM Account a WHERE " +
            "(LOWER(a.fullName) like %:searchValue% or a.username like %:searchValue%) " +
            "and a.role = false")
    List<Account> findByUsernameOrFullname(@Param("searchValue") String searchValue);

    //Delete Account by change the date delete - disable this account
//    @Modifying(clearAutomatically = true)
//    @Query("UPDATE Account a set a.deletedDate = :deletedDate where a.id = :id")
//    void deleteAccount(@Param("deletedDate") String delDate, @Param("id") int id);

    //Find account by ID
    Account findAccountById(Integer id);

}

