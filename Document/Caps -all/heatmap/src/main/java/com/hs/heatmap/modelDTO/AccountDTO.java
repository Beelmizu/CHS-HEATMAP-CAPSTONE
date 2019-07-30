package com.hs.heatmap.modelDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountDTO {

    private int id;
    private String username;
    private String password;
    private String fullName;
    private String email;
    private String phone;
    private int gender;
    private boolean role;
    private String createdDate;
    private String updatedDate;
    private String status;
    private String updatedBy;
    private int cpn_acc_id;

}
