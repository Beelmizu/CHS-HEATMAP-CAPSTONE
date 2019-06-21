package com.hs.heatmap.controller;


import com.hs.heatmap.model.Store;
import com.hs.heatmap.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="*")
public class StoreController {

    @Autowired
    StoreService storeService;

    @GetMapping("/stores/getAll")
    public List<Store> getAllStores(){ return storeService.getAllStores(); }

    @GetMapping("/stores/getStoreInCompany/{id}")
    public List<Store> getStoreInCompany(@PathVariable(value = "id") int id){ return storeService.getStoreByCompany(id); }

    @GetMapping("/stores/getDetail/{id}")
    public Store getDetailStore(@PathVariable(value = "id") int id){ return storeService.getDetailStore(id); }

    @GetMapping("/stores/search/{searchValue}")
    public List<Store> searchStore(@PathVariable(value = "searchValue") String searchValue) { return storeService.getStoreByName(searchValue); }

    @PostMapping("/stores/delete")
    public Store deleteStore(@RequestBody Store store) { return storeService.deleteStore(store); }

    @PostMapping("/stores/update")
    public Store updateStore(@RequestBody Store store) { return storeService.updateStore(store); }

    @PostMapping("/stores/create")
    public Store createStore(@RequestBody Store store) { return storeService.createNewStore(store); }

    @GetMapping("/stores/getStoreByAccount/{id}")
    public List<Store> getStoreByAccount(@PathVariable(value = "id") int id){ return storeService.getAllStoreByAccountId(id); }
}
