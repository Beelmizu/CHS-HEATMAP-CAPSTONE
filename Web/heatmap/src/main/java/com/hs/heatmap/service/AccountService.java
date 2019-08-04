package com.hs.heatmap.service;

import com.hs.heatmap.model.Account;

import java.util.List;
import java.util.Optional;

public interface AccountService {
    Integer getIDByUsername(String username);

    List<Account> getAllAccount();

    List<Account> getAccountByCompany(int id);

    List<Account> getAllAccountByCompanyNotBelongToThisStore(int comID, int stoID);

    List<Account> getAccountByStore(int id);

    Account getDetailAccount(int id);

    List<Account> getAccountsByUsername(String searchValue);

    boolean createNewAccount(Account account);

    boolean addAccountToStore(String accountID, String storeID);

    boolean deleteAccountInStore(String accountID, String storeID);

    boolean changePassword(String accountID, String oldPass, String newPass, String updatedBy);

    boolean updateAccount(Account account);

    boolean inactiveAccount(Account account);

    boolean activeAccount(Account account);

    List<Account> getAccountInCompanyByUsernameOrFullname(String searchValue, int companyID);

    List<Account> getAccountInStoreByUsernameOrFullname(String searchValue, int storeID);
}
