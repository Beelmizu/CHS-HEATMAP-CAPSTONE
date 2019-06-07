package com.hs.heatmap.repository;

import com.hs.heatmap.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreRepository extends JpaRepository<Store, Integer> {

    //Find Store by ID
    Store findStoreById(Integer id);

    //Find Store by name
    @Query("SELECT s FROM Store s WHERE LOWER(s.name) like %:searchValue%")
    List<Store> findStoreByName(@Param("searchValue") String searchValue);

}
