package com.hs.heatmap.controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.hs.heatmap.model.Account;
import com.hs.heatmap.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="*")
public class AccountController {

    @Autowired
    AccountService accountService;

    @GetMapping("/account/getAll")
    public List<Account> getAllAccounts(){
        return accountService.getAllAccount();
    }

    @GetMapping("/account/getAccountByCompany/{id}")
    public List<Account> getAccountByCompany(@PathVariable(value = "id") int id){ return accountService.getAccountByCompany(id); }

    @GetMapping("/account/getAllAccountByCompanyNotBelongToThisStore/{comID}/{stoID}")
    public List<Account> getAllAccountByCompanyNotBelongToThisStore(@PathVariable(value = "comID") int comID, @PathVariable(value = "stoID") int stoID){
        return accountService.getAllAccountByCompanyNotBelongToThisStore(comID, stoID);
    }

    @GetMapping("/account/getAccountByStore/{id}")
    public List<Account> getAccountByStore(@PathVariable(value = "id") int id){ return accountService.getAccountByStore(id); }

    @GetMapping("account/getDetail/{id}")
    public Account getDetailAccount(@PathVariable(value = "id") int id){ return accountService.getDetailAccount(id); }

    @GetMapping("account/getIDByUsername/{username}")
    public Integer getIDByUsername(@PathVariable(value = "username") String username){ return accountService.getIDByUsername(username); }

    @GetMapping("/account/search/{searchValue}")
    public List<Account> searchAccount(@PathVariable(value = "searchValue") String searchValue) { return accountService.getAccountsByUsername(searchValue); }

    @GetMapping("/account/searchInCompany/{searchValue}/{id}")
    public List<Account> searchInCompany(@PathVariable(value = "searchValue") String searchValue, @PathVariable(value = "id") int companyID) {
        return accountService.getAccountInCompanyByUsernameOrFullname(searchValue, companyID);
    }

    @GetMapping("/account/searchInStore/{searchValue}/{id}")
    public List<Account> searchInStore(@PathVariable(value = "searchValue") String searchValue, @PathVariable(value = "id") int storeID) {
        return accountService.getAccountInStoreByUsernameOrFullname(searchValue, storeID);
    }

    @PostMapping("/account/inactive")
    public boolean inactiveAccount(@RequestBody Account account) { return accountService.inactiveAccount(account); }

    @PostMapping("/account/active")
    public boolean activeAccount(@RequestBody Account account) { return accountService.activeAccount(account); }

    @PostMapping("/account/update")
    public boolean updateAccount(@RequestBody Account account) {
        return accountService.updateAccount(account);
    }

    @PostMapping("/account/create")
    public boolean createAccount(@RequestBody Account account) {
        return accountService.createNewAccount(account);
    }

    @PostMapping("/account/addAccountToStore/")
    public boolean addAccountToStore(@RequestParam(name = "accID") String accountID, @RequestParam(name = "stoID") String storeID) {
        return accountService.addAccountToStore(accountID, storeID);
    }

    @PostMapping("/account/deleteAccountInStore/")
    public boolean deleteAccountInStore(@RequestParam(name = "accID") String accountID, @RequestParam(name = "stoID") String storeID) {
        return accountService.deleteAccountInStore(accountID, storeID);
    }

    @PostMapping("/account/changePasswordOfProfile/")
    public boolean changePasswordOfProfile(@RequestParam(name = "accountID") String accountID,
                                  @RequestParam(name = "oldPass") String oldPass,
                                  @RequestParam(name = "newPass") String newPass,
                                  @RequestParam(name = "updatedBy") String updatedBy) {
        return accountService.changePasswordOfProfile(accountID, oldPass, newPass, updatedBy);
    }

    @PostMapping("/account/changePasswordOfAccount/")
    public boolean changePasswordOfAccount(@RequestParam(name = "accountID") String accountID,
                                  @RequestParam(name = "oldPass") String oldPass,
                                  @RequestParam(name = "newPass") String newPass,
                                  @RequestParam(name = "updatedBy") String updatedBy) {
        return accountService.changePasswordOfAccount(accountID, oldPass, newPass, updatedBy);
    }
}
