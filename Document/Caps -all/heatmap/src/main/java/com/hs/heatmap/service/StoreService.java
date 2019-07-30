package com.hs.heatmap.service;

import com.hs.heatmap.model.Store;

import java.util.List;

public interface StoreService {

    List<Store> getAllStores();

    List<Store> getStoreByCompany(int id);

    Store getDetailStore(int id);

    List<Store> getStoreByName(String searchValue);

    Store createNewStore(Store store);

    Store updateStore(Store store);

    Store inactiveStore(Store store);

    Store activeStore(Store store);

    List<Store> getAllStoreByAccountId(int id);

    List<Store> getAllStoreByAccountIdWithoutStatus(int id);
}
