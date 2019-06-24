package com.hs.heatmap.service;

import com.hs.heatmap.model.Account;

import java.util.List;
import java.util.Optional;

public interface AccountService {

    List<Account> getAllAccount();

    List<Account> getAccountByCompany(int id);

    Account getDetailAccount(int id);

    List<Account> getAccountsByUsername(String searchValue);

    Account createNewAccount(Account account);

    Account updateAccount(Account account);

    Account inactiveAccount(Account account);

    Account activeAccount(Account account);
}
