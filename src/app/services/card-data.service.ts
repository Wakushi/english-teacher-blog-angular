import { Injectable } from "@angular/core";
import { Database, get, ref, remove, update, child } from '@angular/fire/database';
import { CardModel } from "../models/card.model";
import { DataBaseObject } from "../interfaces/database-object.interface";
import { Observable, from, map } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class CardDataService {

    constructor(private db: Database) {}

    // We save the last edited card in our service so that the EditPageComponent always has access to it.
    editedPost!:CardModel

    // Retrieves the realtime db ids of the user's liked cards.
    private likesFromStorage = localStorage.getItem('likes');
    likedProjects: string[] = this.likesFromStorage ? JSON.parse(this.likesFromStorage) : [];

    // Firebase method to request data with an endpoint.
    async getDataFromFirebase(endpoint:string): Promise<any> {
        const dataRef = ref(this.db, endpoint);
        const snapshot = await get(dataRef);
        return snapshot.val();
    }

    // getCardData uses the firebase method to retrieve data from a specific db endpoint and returns an Observable
    // that'll emit an array of projects/posts/courses cards, by using the from() function.
    getCardData(endpoint: string): Observable<CardModel[]> {
      return from(this.getDataFromFirebase(endpoint)).pipe(
        map((data: DataBaseObject | null) => {
          const tempArray: CardModel[] = [];
          if (data) {
            for (const [key, value] of Object.entries(data)) {
              tempArray.push({
                id: key,
                type: value.type,
                title: value.title,
                description: value.description ?? null,
                images: value.images ?? null,
                content:value.content ?? null,
                bgColor: value.bgColor ?? null,
                fontColor: value.fontColor ?? null,
                likes: value.likes,
                class: value.class
              });
            }
            tempArray.reverse();
          }
          return tempArray;
        })
      );
    }

  // Delete a specific entry of the realtime db with an endpoint + id.
  // We then filter likedProjects to prevent users from having deleted posts's ids inside their localStorage.
  deletePost(endpoint:string ,postId:string):void{
    const exactLocation = ref(this.db, endpoint + postId)
    remove(exactLocation)
    this.likedProjects = this.likedProjects.filter(id => id !== postId)
    localStorage.setItem('likes', JSON.stringify(this.likedProjects));
  }

  setEditedPost(post:CardModel): void {
    this.editedPost = post
  }

  // Updates the card in the realtime database with its new data. 
  // Returns a Promise so that the admin user is redirected after the update completes.
  updatePost(endpoint: string, postId: string, data: DataBaseObject): Promise<void> {
    const postRef = child(ref(this.db), `${endpoint}/${postId}`);
    return update(postRef, data);
  }

  addLike(projectId: string): void {
    this.likedProjects.push(projectId);
    localStorage.setItem('likes', JSON.stringify(this.likedProjects));
  }

  removeLike(projectId: string): void {
    this.likedProjects = this.likedProjects.filter(liked => liked !== projectId);
    localStorage.setItem('likes', JSON.stringify(this.likedProjects));
  }

  isLiked(projectId: string): boolean {
    return this.likedProjects.includes(projectId);
  }

}