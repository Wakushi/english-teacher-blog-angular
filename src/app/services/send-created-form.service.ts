import { Injectable } from "@angular/core";
import { Database, push, ref } from '@angular/fire/database';
import { DataBaseObject } from "../interfaces/database-object.interface";
import { from, forkJoin, Observable } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
    providedIn:'root'
})

export class SendCreatedFormService {

    constructor(private db: Database, private router:Router) {}

    // Creates a new entry in the firebase db with our data.
    sendDataToFirebase(data: DataBaseObject): void {
        const dataRef = ref(this.db, `/${data.type}`);
        push(dataRef, data)
          .catch((error) => {
            console.error('Erreur lors de l\'envoi des données à Firebase', error);
          });
    }
     
    // mergeSendData merges the card creation form value with the images files.
    // If the admin added images, we upload them to imgur with the uploadImageToImgur method.
    // This way we only have to store the urls inside our realtime db.
    mergeSendData(form:DataBaseObject, images: File[]): void {

        if(images.length > 0){

          // We create an array of Observables<string> which contains the data responses from the imgur API.
            const observables: Observable<string>[] = images.map(image => this.uploadImageToImgur(image));
          // forkJoin waits till we receive all the imgur urls, combines the observables emissions and then emits. 
            forkJoin(observables).subscribe((urls: string[]) => {
              this.sendDataToFirebase({
                type:form.type,
                title:form.title,
                description:form.description,
                content:form.content,
                bgColor:form.bgColor,
                fontColor:form.fontColor,
                class:form.class,
                likes:0,
                images:urls
              })
              this.router.navigateByUrl(form.type)
            });

        } else {

            this.sendDataToFirebase({
                type:form.type,
                title:form.title,
                description:form.description,
                bgColor:form.bgColor,
                fontColor:form.fontColor,
                class:form.class,
                likes:0,
                content:form.content
              })
            this.router.navigateByUrl(form.type)

        }
    }
      

    uploadImageToImgur(imageFile: File): Observable<string> {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Client-ID ce87ea9c71cf709");
      
        const formData = new FormData();
        formData.append("image", imageFile);
      
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formData,
          redirect: 'follow' as RequestRedirect
        };
      
        return from(
          fetch("https://api.imgur.com/3/image", requestOptions)
            .then(r => r.json())
            .then((data: any) => {
              const finalUrl = data.data.link;
              return finalUrl;
            })
            .catch(err => {
              alert('Something wrong happened ! - ' + err)
              this.router.navigateByUrl('')
            })
        );
      }


          
}

