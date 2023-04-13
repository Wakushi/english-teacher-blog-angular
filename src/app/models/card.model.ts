// CardModel is the unique model for all projects/posts/courses templates.

export class CardModel {
    id!:string;
    type!:string;
    title!:string;
    description!:string;
    images?:string[];
    content?:string;
    bgColor!:string;
    fontColor!:string;
    likes!:number;
    class!:string;
}