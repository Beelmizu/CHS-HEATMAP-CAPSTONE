package com.hs.heatmap.controller;


import com.hs.heatmap.model.Store;
import com.hs.heatmap.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200")
public class StoreController {

    @Autowired
    StoreService storeService;

    @GetMapping("/stores/getAll")
    public List<Store> getAllStores(){ return storeService.getAllStores(); }

    @GetMapping("stores/getDetail/{id}")
    public Store getDetailStore(@PathVariable(value = "id") int id){ return storeService.getDetailStore(id); }

    @GetMapping("/stores/search/{searchValue}")
    public List<Store> searchStore(@PathVariable(value = "searchValue") String searchValue) { return storeService.getStoreByName(searchValue); }

    @DeleteMapping("/stores/delete")
    public Store deleteStoreById(@RequestBody Store store) { return storeService.deleteStore(store); }

    @PostMapping("/stores/update")
    public Store updateStore(@RequestBody Store store) { return storeService.updateStore(store); }

    @PostMapping("/stores/create")
    public Store createStore(@RequestBody Store store) { return storeService.createNewStore(store); }

}
