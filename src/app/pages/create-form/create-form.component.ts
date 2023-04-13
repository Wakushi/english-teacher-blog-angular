import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribe } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SendCreatedFormService } from 'src/app/services/send-created-form.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit, OnDestroy {

  constructor(
    private loginService:LoginService, 
    private router:Router, 
    private formBuilder:FormBuilder,
    private sendCreatedFormService: SendCreatedFormService
  ){}
    private unsubscribeAuth!: Unsubscribe;

  isUserLogged!:boolean
  isCreating!:boolean
  creationForm!:FormGroup
  selectedImages: File[] = []

  ngOnInit(): void {

    // Boolean to display the loader after the create confirmation button is clicked. 
    this.isCreating = false

    // Prevents non-logged users to access the page with its endpoint.
    this.unsubscribeAuth = this.loginService.initAuthListener((loggedIn) => {
      this.isUserLogged = loggedIn;
      if(!this.isUserLogged) {
        this.router.navigateByUrl('')
        console.log('You need to be logged to access this page.')
      }
    });

    this.creationForm = this.formBuilder.group({
      type:'students',
      title:[null],
      description:[null],
      content:[null],
      class:[null],
      bgColor:'#111',
      fontColor:'#fff'
    })

  }

  ngOnDestroy():void {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth();
    }
  }

  // Checks if images (files) are selected by the admin user to add them to selectedImages.
  onFileChange(event:any) {
    this.selectedImages = Array.from(event.target.files);
  }

  // Gathers all the data and send it to our firebase realtime database.
  sendData():void{
    this.sendCreatedFormService.mergeSendData(this.creationForm.value, this.selectedImages)
    this.isCreating = true
  }

}
