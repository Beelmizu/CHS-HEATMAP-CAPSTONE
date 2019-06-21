package com.hs.heatmap.repository;

import com.hs.heatmap.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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

}
