import { Camera } from './camera.model';

export class Report  {
    public id: number;
    public time: String;
    public count: number;
    public heatmap: String;
    public people_gender: String;
    public people_age: String;
    public cameraID: number;
    public camera: Camera;
}
