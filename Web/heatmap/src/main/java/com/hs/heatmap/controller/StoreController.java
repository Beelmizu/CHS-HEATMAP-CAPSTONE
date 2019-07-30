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

    @GetMapping("/store/getAll")
    public List<Store> getAllStores(){ return storeService.getAllStores(); }

    @GetMapping("/store/getStoreInCompany/{id}")
    public List<Store> getStoreInCompany(@PathVariable(value = "id") int id){ return storeService.getStoreByCompany(id); }

    @GetMapping("/store/getDetail/{id}")
    public Store getDetailStore(@PathVariable(value = "id") int id){ return storeService.getDetailStore(id); }

    @GetMapping("/store/search/{searchValue}")
    public List<Store> searchStore(@PathVariable(value = "searchValue") String searchValue) { return storeService.getStoreByName(searchValue); }

    @PostMapping("/store/inactive")
    public Store inactiveStore(@RequestBody Store store) { return storeService.inactiveStore(store); }

    @PostMapping("/store/active")
    public Store activeStore(@RequestBody Store store) { return storeService.activeStore(store); }

    @PostMapping("/store/update")
    public Store updateStore(@RequestBody Store store) { return storeService.updateStore(store); }

    @PostMapping("/store/create")
    public Store createStore(@RequestBody Store store) { return storeService.createNewStore(store); }

    @GetMapping("/store/getStoreByAccount/{id}")
    public List<Store> getStoreByAccount(@PathVariable(value = "id") int id){ return storeService.getAllStoreByAccountId(id); }

    @GetMapping("/store/getStoreByAccountWithoutStatus/{id}")
    public List<Store> getStoreByAccountWithoutStatus(@PathVariable(value = "id") int id){ return storeService.getAllStoreByAccountIdWithoutStatus(id); }
}
