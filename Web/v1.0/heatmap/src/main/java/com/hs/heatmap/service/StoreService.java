package com.hs.heatmap.service;

import com.hs.heatmap.model.Store;

import java.util.List;

public interface StoreService {

    List<Store> getAllStores();

    List<Store> getStoreByCompany(int id);

    List<Store> getAllStoreInCompanyNotBelongAccount(int comID, int accID);

    Store getDetailStore(int id);

    List<Store> getStoreByName(String searchValue);

    boolean createNewStore(Store store);

    boolean updateStore(Store store);

    boolean inactiveStore(Store store);

    boolean activeStore(Store store);

    List<Store> getAllStoreByAccountId(int id);

    List<Store> getAllStoreByAccountIdWithoutStatus(int id);

    boolean addStoreToAccount(String accountID, String storeID);

    boolean deleteStoreOfAccount(String accountID, String storeID);

    List<Store> getStoreInCompanyByValue(String searchValue, int companyID);

    List<Store> getStoreOfAccountByValue(String searchValue, int accID);
}
