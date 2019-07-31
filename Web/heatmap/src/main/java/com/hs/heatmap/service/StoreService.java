package com.hs.heatmap.service;

import com.hs.heatmap.model.Store;

import java.util.List;

public interface StoreService {

    List<Store> getAllStores();

    List<Store> getStoreByCompany(int id);

    Store getDetailStore(int id);

    List<Store> getStoreByName(String searchValue);

    boolean createNewStore(Store store);

    boolean addStoreToAccount(Store store, Integer accountID);

    boolean updateStore(Store store);

    boolean inactiveStore(Store store);

    boolean activeStore(Store store);

    List<Store> getAllStoreByAccountId(int id);

    List<Store> getAllStoreByAccountIdWithoutStatus(int id);
}
