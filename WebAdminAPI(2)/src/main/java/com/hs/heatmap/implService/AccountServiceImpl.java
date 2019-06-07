package com.hs.heatmap.implService;

import com.hs.heatmap.model.Account;
import com.hs.heatmap.repository.AccountRepository;
import com.hs.heatmap.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.getAccountByRole();
    }

    @Override
    public Account getDetailAccount(int id) { return accountRepository.findAccountById(id); }

    @Override
    public List<Account> getAccountsByUsername(String searchValue) { return accountRepository.findByUsernameOrFullname(searchValue); }

    @Override
    public Account updateAccount(Account account) {
        account.setUpdateDate(LocalDate.now().toString());
        account.setUpdatedBy("cuongdq");
        return accountRepository.save(account);
    }

    @Override
    public Account deleteAccount(Account account) {
        account.setDeletedDate(LocalDate.now().toString());
        return accountRepository.save(account);
    }

    @Override
    public Account createNewAccount(Account account) {
        account.setCreateDate(LocalDate.now().toString());
        return accountRepository.save(account);
    }


}
