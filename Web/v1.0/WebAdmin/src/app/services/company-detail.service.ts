import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyDetailService {

  private companyUrl = 'http://localhost:8080/api/company/';
  private headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  };

  constructor(private http: HttpClient) { }

  getCompanyByID(companyID: number): Observable<Company> {
    return this.http.get<Company>(this.companyUrl + 'getDetail/' + companyID);
  }

  inactiveCompanyByID(company: Company): Observable<any> {
    return this.http.post<any>(this.companyUrl + 'inactive/', company);
  }

  activeCompanyByID(company: Company): Observable<any> {
    return this.http.post<any>(this.companyUrl + 'active/', company);
  }

  updateCompanyByID(company: Company): Observable<any> {
    return this.http.post<any>(this.companyUrl + 'update/', company);
  }

 addNewCompany(company: Company): Observable<any> {
    return this.http.post<any>(this.companyUrl + 'create/',  company);
  }
}
