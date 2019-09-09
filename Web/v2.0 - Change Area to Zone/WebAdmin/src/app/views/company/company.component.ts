import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company.model';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  companyForm: FormGroup;
  companies: Company[];

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.companyForm = this.fb.group({
      'searchValue': ''
    });
    this.getAllCompanies();
  }

  getAllCompanies() {
    const self = this;
    this.companyService.getAllCompanies().subscribe((companyList) => {
      this.companies = companyList;
    }, (error) => {
      console.log(error);
    });
  }

  searchCompanyByName(searchValue: String): void {
    const self = this;
    if (searchValue === '') {
      this.getAllCompanies();
    } else {
      this.companyService.getCompanyByValue(searchValue).subscribe((companyList) => {
        if (companyList.length === 0) {
          this.toastr.warning('Cannot find company by value!', 'Warning');
        } else {
          this.companies = companyList;
        }
      }, (error) => {
        console.log(error);
      });
    }
  }

}
