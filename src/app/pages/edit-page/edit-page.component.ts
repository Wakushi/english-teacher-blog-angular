import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CardModel } from 'src/app/models/card.model';
import { CardDataService } from 'src/app/services/card-data.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  constructor(
    private cardDataService:CardDataService, 
    private loginService:LoginService,
    private router:Router,
  ){}
  private unsubscribeAuth!: Unsubscribe;

  isUserLogged!:boolean
  card!: CardModel

  ngOnInit(): void {

    // Prevents non-logged users to access the page with its endpoint.
    this.unsubscribeAuth = this.loginService.initAuthListener((loggedIn) => {
      this.isUserLogged = loggedIn;
      if(!this.isUserLogged) {
        this.router.navigateByUrl('')
        console.log('You need to be logged to access this page.')
      } else if (this.cardDataService.editedPost == undefined) {
        this.router.navigateByUrl('')
        console.log('No post selected for editing.')
      }
    });

    this.card = this.cardDataService.editedPost

    window.scrollTo(0,0)

  }

  // Updates the card in the realtime database with its new data.
  completeEdition():void {

    const endpoint = this.card.type;
    const postId = this.card.id;
    const newData = this.card

    this.cardDataService.updatePost(endpoint, postId, newData)
      .then(() => {
        this.router.navigateByUrl(`/${endpoint}`)
      })
      .catch(error => console.error('Error updating entry:', error));
  }

  returnToPage():void {
    this.router.navigateByUrl(`/${this.card.type}`)
  }


}


