package com.hs.heatmap.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Store implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sto_id")
    private int id;

    @Basic
    @Column(name = "sto_name")
    private String name;

    @Basic
    @Column(name = "sto_address")
    private String address;

    @Basic
    @Column(name = "sto_phone")
    private String phone;

    @Basic
    @Column(name = "sto_date_created")
    private String createDate;

    @Basic
    @Column(name = "sto_date_updated")
    private String updateDate;

    @Basic
    @Column(name = "sto_status")
    private String status;

    @Basic
    @Column(name = "sto_update_by")
    private String updatedBy;

    @Basic
    @Column(name = "cpn_store_id")
    private int cpn_store_id;

    @ManyToOne
    @JoinColumn(name = "cpn_store_id", insertable = false, updatable = false)
    private Company company;

//    @ManyToMany(fetch = FetchType.LAZY,
//            cascade = {
//                    CascadeType.PERSIST,
//                    CascadeType.MERGE
//            },
//            mappedBy = "stores")
//    private Set<Account> accounts = new HashSet<>();

//    @OneToMany( mappedBy = "store", cascade = CascadeType.ALL)
//    private List<AccountStore> accountStoreList;
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        Store store = (Store) o;
//        return id == store.id &&
//                Objects.equals(name, store.name) &&
//                Objects.equals(address, store.address) &&
//                Objects.equals(phone, store.phone) &&
//                Objects.equals(createDate, store.createDate) &&
//                Objects.equals(updateDate, store.updateDate) &&
//                Objects.equals(status, store.status) &&
//                Objects.equals(updatedBy, store.updatedBy) &&
//                Objects.equals(cpn_store_id, store.cpn_store_id);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(id, name, address, phone, createDate, updateDate, status, updatedBy, cpn_store_id);
//    }

}
