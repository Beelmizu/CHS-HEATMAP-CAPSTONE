import { Area } from './area.model';

export class Camera  {
    public id: number;
    public ip: String;
    public account: String;
    public password: String;
    public createDate: String;
    public updateDate: String;
    public status: String;
    public updatedBy: String;
    public areaID: number;
    public area: Area;
}
