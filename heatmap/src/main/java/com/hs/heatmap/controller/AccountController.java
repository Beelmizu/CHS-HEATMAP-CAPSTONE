package com.hs.heatmap.controller;

import com.hs.heatmap.model.Account;
import com.hs.heatmap.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="*")
public class AccountController {

    @Autowired
    AccountService accountService;

    @GetMapping("/accounts/getAll")
    public List<Account> getAllAccounts(){ return accountService.getAllAccount(); }

    @GetMapping("/accounts/getAccountByCompany/{id}")
    public List<Account> getAccountByCompany(@PathVariable(value = "id") int id){ return accountService.getAccountByCompany(id); }

    @GetMapping("accounts/getDetail/{id}")
    public Account getDetailAccount(@PathVariable(value = "id") int id){ return accountService.getDetailAccount(id); }

    @GetMapping("/accounts/search/{searchValue}")
    public List<Account> searchAccount(@PathVariable(value = "searchValue") String searchValue) { return accountService.getAccountsByUsername(searchValue); }

    @PostMapping("/accounts/inactive")
    public Account inactiveAccount(@RequestBody Account account) { return accountService.inactiveAccount(account); }

    @PostMapping("/accounts/active")
    public Account activeAccount(@RequestBody Account account) { return accountService.activeAccount(account); }

    @PostMapping("/accounts/update")
    public Account updateAccount(@RequestBody Account account) { return accountService.updateAccount(account); }

    @PostMapping("/accounts/create")
    public Account createAccount(@RequestBody Account account) { return accountService.createNewAccount(account); }
}
