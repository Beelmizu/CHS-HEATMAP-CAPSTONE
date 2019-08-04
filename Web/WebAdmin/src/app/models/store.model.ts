import { Company } from './company.model';

export class Store  {
    public id: number;
    public name: String;
    public address: String;
    public phone: String;
    public createdDate: String;
    public updatedDate: String;
    public status: String;
    public updatedBy: String;
    public cpn_store_id: number;
    public company: Company;
}
