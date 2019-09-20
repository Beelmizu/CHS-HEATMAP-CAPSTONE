package com.hs.heatmap.repository;

import com.hs.heatmap.model.Account;
import com.hs.heatmap.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

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
    List<Account> findAccountByStore(@Param("id") int id);

    //Find account by company
    @Query("SELECT a FROM Account a WHERE a.cpn_acc_id = :id")
    List<Account> findAccountByCompany(int id);

    @Modifying
    @Query(value = "INSERT into account_store (acc_sto_date_created, account_id, store_id) VALUES (:dateCreated,:accountID,:storeID)", nativeQuery = true)
    @Transactional
    int addAccountToStore(@Param("dateCreated") String date, @Param("accountID") int accID, @Param("storeID") int storeID);

    @Modifying
    @Query(value = "delete from AccountStore a where a.acc_id = :accountID and a.sto_id = :storeID")
    @Transactional
    int deleteAccountInStore(@Param("accountID") int accID, @Param("storeID") int storeID);

    @Query("SELECT a FROM Account a JOIN AccountStore s ON a.id = s.acc_id WHERE a.cpn_acc_id = :comID and s.sto_id = :stoID")
    List<Account> getAllAccountByCompanyBelongToThisStore(@Param("comID") int comID, @Param("stoID") int stoID);

    @Query("SELECT a FROM Account a WHERE " +
            "(LOWER(a.fullName) like %:searchValue% or a.username like %:searchValue%) and a.role = false and a.cpn_acc_id = :companyID")
    List<Account> getAccountInCompanyByUsernameOrFullname(@Param("searchValue") String searchValue, @Param("companyID") int companyID);

    @Query("SELECT a FROM Account a JOIN AccountStore s ON a.id = s.acc_id WHERE " +
            "(LOWER(a.fullName) like %:searchValue% or a.username like %:searchValue%) and " +
            "a.role = false and s.sto_id = :stoID")
    List<Account> getAccountInStoreByUsernameOrFullname(@Param("searchValue") String searchValue, @Param("stoID") int storeID);
}

