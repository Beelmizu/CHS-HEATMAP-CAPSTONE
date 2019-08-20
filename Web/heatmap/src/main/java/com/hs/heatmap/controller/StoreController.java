package com.hs.heatmap.controller;


import com.hs.heatmap.model.Store;
import com.hs.heatmap.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class StoreController {

    @Autowired
    StoreService storeService;

    @GetMapping("/store/getAll")
    public List<Store> getAllStores() {
        return storeService.getAllStores();
    }

    @GetMapping("/store/getStoreInCompany/{id}")
    public List<Store> getStoreInCompany(@PathVariable(value = "id") int id) {
        return storeService.getStoreByCompany(id);
    }

    @GetMapping("/store/getDetail/{id}")
    public Store getDetailStore(@PathVariable(value = "id") int id) {
        return storeService.getDetailStore(id);
    }

    @GetMapping("/store/search/{searchValue}")
    public List<Store> searchStore(@PathVariable(value = "searchValue") String searchValue) {
        return storeService.getStoreByName(searchValue);
    }

    @GetMapping("/store/getStoreInCompanyByValue/{searchValue}/{id}")
    public List<Store> searchInCompany(@PathVariable(value = "searchValue") String searchValue, @PathVariable(value = "id") int companyID) {
        return storeService.getStoreInCompanyByValue(searchValue, companyID);
    }

    @GetMapping("/store/getStoreOfAccountByValue/{searchValue}/{id}")
    public List<Store> searchByAccount(@PathVariable(value = "searchValue") String searchValue, @PathVariable(value = "id") int accID) {
        return storeService.getStoreOfAccountByValue(searchValue, accID);
    }

    @PostMapping("/store/inactive")
    public boolean inactiveStore(@RequestBody Store store) {
        return storeService.inactiveStore(store);
    }

    @PostMapping("/store/active")
    public boolean activeStore(@RequestBody Store store) {
        return storeService.activeStore(store);
    }

    @PostMapping("/store/update")
    public boolean updateStore(@RequestBody Store store) {
        return storeService.updateStore(store);
    }

    @PostMapping("/store/create")
    public boolean createStore(@RequestBody Store store) {
        return storeService.createNewStore(store);
    }

    @GetMapping("/store/getStoreByAccount/{id}")
    public List<Store> getStoreByAccount(@PathVariable(value = "id") int id) {
        return storeService.getAllStoreByAccountId(id);
    }

    @GetMapping("/store/getStoreByAccountWithoutStatus/{id}")
    public List<Store> getStoreByAccountWithoutStatus(@PathVariable(value = "id") int id) {
        return storeService.getAllStoreByAccountIdWithoutStatus(id);
    }

    @GetMapping("/store/getAllStoreInCompanyNotBelongAccount/{comID}/{accID}")
    public List<Store> getAllStoreInCompanyNotBelongAccount(@PathVariable(value = "comID") int comID, @PathVariable(value = "accID") int accID) {
        return storeService.getAllStoreInCompanyNotBelongAccount(comID, accID);
    }

    @PostMapping("/store/addStoreToAccount/")
    public boolean addStoreToAccount(@RequestParam(name = "accID") String accountID, @RequestParam(name = "stoID") String storeID) {
        return storeService.addStoreToAccount(accountID, storeID);
    }

    @PostMapping("/store/deleteStoreOfAccount/")
    public boolean deleteStoreOfAccount(@RequestParam(name = "accID") String accountID, @RequestParam(name = "stoID") String storeID) {
        return storeService.deleteStoreOfAccount(accountID, storeID);
    }

}
