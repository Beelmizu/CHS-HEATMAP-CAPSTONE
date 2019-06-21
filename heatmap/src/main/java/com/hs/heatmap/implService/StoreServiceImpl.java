package com.hs.heatmap.implService;

import com.hs.heatmap.model.Store;
import com.hs.heatmap.repository.StoreRepository;
import com.hs.heatmap.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class StoreServiceImpl implements StoreService {

    @Autowired
    private StoreRepository storeRepository;

    @Override
    public List<Store> getAllStores() {return storeRepository.findAll(); }

    @Override
    public List<Store> getStoreByCompany(int id) { return storeRepository.getStoreInCompany(id); }

    @Override
    public Store getDetailStore(int id) { return storeRepository.findStoreById(id); }

    @Override
    public List<Store> getStoreByName(String searchValue) { return storeRepository.searchStoreByName(searchValue); }

    @Override
    public Store createNewStore(Store store) {
        if (storeRepository.findStoreByName(store.getName()) != null) {
            return null;
        } else {
            store.setCreateDate(LocalDateTime.now().toString());
            store.setStatus("active");
            return storeRepository.save(store);
        }
    }

    @Override
    public Store updateStore(Store store) {
        store.setUpdateDate(LocalDateTime.now().toString());
        store.setUpdatedBy("cuongdq");
        return storeRepository.save(store);
    }

    @Override
    public Store deleteStore(Store store) {
        store.setStatus("inactive");
        return storeRepository.save(store);
    }

    @Override
    public List<Store> getAllStoreByAccountId(int id) {
        return storeRepository.findStoreByAccountID(id);
    }


}
