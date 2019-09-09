import { Zone } from './zone.model';

export class Camera  {
    public id: number;
    public ip: String;
    public name: String;
    public account: String;
    public password: String;
    public createdDate: String;
    public updatedDate: String;
    public status: String;
    public imageUrl: String;
    public imagePreview: String;
    public updatedBy: String;
    public zoneID: number;
    public zone: Zone;
}
