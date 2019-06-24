package com.hs.heatmap.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "id")
public class AccountStore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "acc_sto_id")
    private int id;

    @Basic
    @Column(name = "acc_sto_date_created")
    private String createdDate;

    @Basic
    @Column(name = "acc_sto_date_updated")
    private String updatedDate;

    @Basic
    @Column(name = "acc_sto_updated_by" )
    private int updatedBy;


    @Basic
    @Column(name = "account_id")
    private int acc_id;

    @ManyToOne
    @JoinColumn(name = "account_id", insertable = false, updatable = false)
    private Account account;

    @Basic
    @Column(name = "store_id")
    private int sto_id;

    @ManyToOne
    @JoinColumn(name = "store_id" , insertable = false, updatable = false)
    private Store store;


}
