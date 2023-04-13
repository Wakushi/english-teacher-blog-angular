import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Unsubscribe } from 'firebase/auth';
import { LoginService } from 'src/app/services/login.service';
import { CardModel } from 'src/app/models/card.model';
import { CardDataService } from 'src/app/services/card-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  // @Input decorateur allows card data to be injected from the parent component.
  @Input() card!: CardModel
  // @Output allows us to create an event that will trigger a method of the parent component.
  @Output() cardDeleted = new EventEmitter<string>();

  constructor(
      private cardDataService:CardDataService, 
      private loginService:LoginService,
      private router:Router
    ){}

  private unsubscribeAuth!: Unsubscribe;
  
  // isUserLogged controls the display of edit/delete icons for each post thanks to loginService.
  isUserLogged!:boolean

  // areIconDisplayed acts as a switch to display delete confirm/cancel icons.
  areIconDisplayed:boolean = false

  // currentImage serves as an index reference of the card's images array to display one correct image.
  currentImage:number = 0

  // isImgModalDisplayed acts as a switch to display an image on 'fullscreen'.
  isImgModalDisplayed:boolean = false

  // isLiked acts as a switch to display the like icon colors correctly to the user.
  isLiked!: boolean

  
  ngOnInit(): void {
    
    // We check with angular/fire/auth if the user is logged and we update isUserLogged (boolean).
    this.unsubscribeAuth = this.loginService.initAuthListener((loggedIn) => {
      this.isUserLogged = loggedIn;
    });

    // When the card is rendered we check with isLiked if it has been liked by the user.
    this.isLiked = this.cardDataService.isLiked(this.card.id)

  }

  // We stop listening to the user's status when the component is destroyed.
  ngOnDestroy():void {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth();
    }
  }

  // Toggle method to switch display of delete icons.
  toggleIconDisplay():void {
    this.areIconDisplayed = !this.areIconDisplayed
  }

  // Deletes the object from the firebase database using its id.
  // We then emit to the parent to also delete the object locally.
  deleteProject():void {
    this.cardDataService.deletePost(`/${this.card.type}/`, this.card.id) 
    this.cardDeleted.emit(this.card.id);
  }

  // Increments the index to display the next image of the card.images array (cf. card template).
  onNextImage():void{
    if(this.card.images){
      this.currentImage = (this.currentImage + 1) % this.card.images.length
    }
  }

  // Decrements the index to display the previous image of the card.images array.
  onPreviousImage():void{
    if(this.card.images){
      this.currentImage = (this.currentImage - 1 + this.card.images.length) % this.card.images.length
    }
  } 

  // Injects the whole card object to our service so the EditComponent has a reference to the edited post.
  editPost():void {
    this.cardDataService.setEditedPost(this.card)
    this.router.navigateByUrl('edit')
  }

  toggleImageModal():void {
    this.isImgModalDisplayed = !this.isImgModalDisplayed
  }

  // Update the card's likes locally and in the firebase database.
  handleLike(): void {
    if (!this.cardDataService.isLiked(this.card.id)) {
      this.cardDataService.addLike(this.card.id);
      this.card.likes++;
      this.isLiked = !this.isLiked
    } else {
      this.cardDataService.removeLike(this.card.id);
      this.card.likes--;
      this.isLiked = !this.isLiked
    }

    this.cardDataService.updatePost(this.card.type, this.card.id, this.card);
  }

} {

}
