// DataBaseObject is the interface that handles the data coming from our Firebase Realtime Database.

export interface DataBaseObject {
    type:string;
    title:string;
    description:string;
    content?:string;
    bgColor?:string;
    fontColor?:string;
    images?:string[];
    likes:number;
    class?:string;
}