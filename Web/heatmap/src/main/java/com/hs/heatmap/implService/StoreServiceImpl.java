package com.hs.heatmap.implService;

import com.hs.heatmap.model.Store;
import com.hs.heatmap.repository.StoreRepository;
import com.hs.heatmap.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class StoreServiceImpl implements StoreService {

    @Autowired
    private StoreRepository storeRepository;

    @Override
    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    @Override
    public List<Store> getStoreByCompany(int id) {
        return storeRepository.getStoreInCompany(id);
    }

    @Override
    public List<Store> getAllStoreInCompanyNotBelongAccount(int comID, int accID) {
        List<Store> storeInCompany = storeRepository.getStoreInCompany(comID);
        List<Store> storeOfAccount = storeRepository.getAllStoreInCompanyNotBelongAccount(comID, accID);
        List<Store> result = new ArrayList<>(storeInCompany);
        result.removeAll(storeOfAccount);
        return result;
    }

    @Override
    public Store getDetailStore(int id) {
        return storeRepository.findStoreById(id);
    }

    @Override
    public List<Store> getStoreByName(String searchValue) {
        return storeRepository.searchStoreByName(searchValue);
    }

    @Override
    public boolean createNewStore(Store store) {
        Store existedStore = storeRepository.findStoreByName(store.getName());
        if (existedStore != null) {
            return false;
        } else {
            store.setCreatedDate(LocalDateTime.now().toString());
            store.setStatus("active");
            System.out.println(store.getCpn_store_id());
            storeRepository.save(store);
            return true;
        }
    }

    @Override
    public boolean updateStore(Store store) {
        Store existedStore = storeRepository.findStoreById(store.getId());
        if (existedStore != null) {
            store.setUpdatedDate(LocalDateTime.now().toString());
            store.setUpdatedBy(store.getUpdatedBy());
            storeRepository.save(store);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean inactiveStore(Store store) {

        Store existedStore = storeRepository.findStoreById(store.getId());
        if (existedStore != null) {
            store.setUpdatedDate(LocalDateTime.now().toString());
            store.setUpdatedBy(store.getUpdatedBy());
            store.setStatus("inactive");
            storeRepository.save(store);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean activeStore(Store store) {
        Store existedStore = storeRepository.findStoreById(store.getId());
        if (existedStore != null) {
            store.setUpdatedDate(LocalDateTime.now().toString());
            store.setUpdatedBy(store.getUpdatedBy());
            store.setStatus("active");
            storeRepository.save(store);
            return true;
        } else {
            return false;
        }
    }


    @Override
    public List<Store> getAllStoreByAccountId(int id) {
        return storeRepository.findStoreByAccountID(id);
    }

    @Override
    public List<Store> getAllStoreByAccountIdWithoutStatus(int id) {
        return storeRepository.findStoreByAccountIDWithoutStatus(id);
    }

    @Override
    public boolean addStoreToAccount(String accountID, String storeID) {
        int result = storeRepository.addStoreToAccount(LocalDateTime.now().toString(), Integer.parseInt(accountID), Integer.parseInt(storeID));
        if (result != 1) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public boolean deleteStoreOfAccount(String accountID, String storeID) {
        int result = storeRepository.deleteStoreOfAccount(Integer.parseInt(accountID), Integer.parseInt(storeID));
        if (result != 1) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public List<Store> getStoreInCompanyByValue(String searchValue, int companyID) {
        return storeRepository.getStoreInCompanyByValue(searchValue, companyID);
    }

    @Override
    public List<Store> getStoreOfAccountByValue(String searchValue, int accID) {
        return storeRepository.getStoreOfAccountByValue(searchValue, accID);
    }


}
