package com.hs.heatmap.repository;

import com.hs.heatmap.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface StoreRepository extends JpaRepository<Store, Integer> {

    //Find Company by ID
    Store findStoreById(Integer id);

    //Find company by name
    @Query("SELECT s FROM Store s WHERE LOWER(s.name) like %:searchValue% ")
    List<Store> searchStoreByName(@Param("searchValue") String searchValue);

    Store findStoreByName(String name);

    @Query("SELECT s FROM Store s WHERE s.cpn_store_id = :id")
    List<Store> getStoreInCompany(@Param("id") int id);

    @Query("SELECT a.store FROM AccountStore a WHERE a.acc_id = :id and a.store.status = 'active'")
    List<Store> findStoreByAccountID(@Param("id")int id);

    @Query("SELECT a.store FROM AccountStore a WHERE a.acc_id = :id")
    List<Store> findStoreByAccountIDWithoutStatus(@Param("id")int id);

    @Query("SELECT a.store FROM AccountStore a WHERE a.acc_id = :id AND a.sto_id = :stoID")
    Store findStoreWithAccountID(@Param("stoID") int stoID, @Param("id")int id);

    @Query("SELECT s FROM Store s JOIN AccountStore a ON s.id = a.sto_id WHERE s.cpn_store_id = :comID and a.acc_id = :accID")
    List<Store> getAllStoreInCompanyNotBelongAccount(@Param("comID")int comID, @Param("accID")int accID);

    @Modifying
    @Query(value = "INSERT into account_store (acc_sto_date_created, account_id, store_id) VALUES (:dateCreated,:accountID,:storeID)", nativeQuery = true)
    @Transactional
    int addStoreToAccount(@Param("dateCreated") String date, @Param("accountID") int accID, @Param("storeID") int storeID);

    @Modifying
    @Query(value = "delete from AccountStore a where a.acc_id = :accountID and a.sto_id = :storeID")
    @Transactional
    int deleteStoreOfAccount(@Param("accountID") int accID, @Param("storeID") int storeID);

    @Query("SELECT s FROM Store s WHERE LOWER(s.name) like %:searchValue% and s.cpn_store_id = :companyID")
    List<Store> getStoreInCompanyByValue(@Param("searchValue")String searchValue, @Param("companyID")int companyID);

    @Query("SELECT s FROM Store s JOIN AccountStore x ON s.id = x.sto_id WHERE " +
            "LOWER(s.name) like %:searchValue% and " +
            "x.acc_id = :accID")
    List<Store> getStoreOfAccountByValue(@Param("searchValue")String searchValue, @Param("accID")int accID);
}
