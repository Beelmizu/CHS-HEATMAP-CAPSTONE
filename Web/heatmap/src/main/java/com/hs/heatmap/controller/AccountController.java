package com.hs.heatmap.controller;

import com.hs.heatmap.model.Account;
import com.hs.heatmap.model.ApiResponse;
import com.hs.heatmap.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="*")
public class AccountController {

    @Autowired
    AccountService accountService;

    @GetMapping("/account/getAll")
    public ApiResponse<List<Account>> getAllAccounts(){
        return new ApiResponse<>(HttpStatus.OK.value(), "Account list fetched successfully.",accountService.getAllAccount());

    }

    @GetMapping("/account/getAccountByCompany/{id}")
    public List<Account> getAccountByCompany(@PathVariable(value = "id") int id){
        return accountService.getAccountByCompany(id);
    }

    @GetMapping("account/getDetail/{id}")
    public Account getDetailAccount(@PathVariable(value = "id") int id){
        return accountService.getDetailAccount(id);
    }

    @GetMapping("/account/search/{searchValue}")
    public List<Account> searchAccount(@PathVariable(value = "searchValue") String searchValue) {
        return accountService.getAccountsByUsername(searchValue);
    }

    @PostMapping("/account/inactive")
    public Account inactiveAccount(@RequestBody Account account) {
        return accountService.inactiveAccount(account);
    }

    @PostMapping("/account/active")
    public Account activeAccount(@RequestBody Account account) {
        return accountService.activeAccount(account);
    }

    @PostMapping("/account/update")
    public Account updateAccount(@RequestBody Account account) {
        return accountService.updateAccount(account);
    }

    @PostMapping("/account/create")
    public Account createAccount(@RequestBody Account account) {
        return accountService.createNewAccount(account);
    }
}
