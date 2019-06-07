package com.hs.heatmap.implService;

import com.hs.heatmap.model.Store;
import com.hs.heatmap.repository.StoreRepository;
import com.hs.heatmap.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class StoreServiceImpl implements StoreService {

    @Autowired
    private StoreRepository storeRepository;

    @Override
    public List<Store> getAllStores() {return storeRepository.findAll(); }

    @Override
    public Store getDetailStore(int id) { return storeRepository.findStoreById(id); }

    @Override
    public List<Store> getStoreByName(String searchValue) { return storeRepository.findStoreByName(searchValue); }

    @Override
    public Store createNewStore(Store store) {
        store.setCreateDate(LocalDate.now().toString());
        return storeRepository.save(store);
    }

    @Override
    public Store updateStore(Store store) {
        store.setUpdateDate(LocalDate.now().toString());
        store.setUpdatedBy("cuongdq");
        return storeRepository.save(store);
    }

    @Override
    public Store deleteStore(Store store) {
        store.setDeletedDate(LocalDate.now().toString());
        return storeRepository.save(store);
    }
}
