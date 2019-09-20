import { Camera } from './camera.model';


export class Page {
    public content: Camera[];
    public last: boolean;
    public totalElements: number;
    public totalPages: number;
    public size: number;
    public number: number;
    public sort: String;
    public numberOfElements: number;
    public first: boolean;
}
