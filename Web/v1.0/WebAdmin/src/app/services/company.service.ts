import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyUrl = 'http://localhost:8080/api/company/';
  private headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  };

  constructor(private http: HttpClient) {
  }

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companyUrl + 'getAll');
  }

  getCompanyByValue(searchValue: String): Observable<Company[]> {
    return this.http.get<Company[]>(this.companyUrl + 'search/' + searchValue);
  }
}
