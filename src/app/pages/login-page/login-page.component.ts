import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!:FormGroup;

  constructor(private formBuilder:FormBuilder, private loginService:LoginService ){}

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email:[null],
      password:[null]
    })
    
  }

  signIn(form:FormGroup):void{
    this.loginService.signIn(form)
  }

}
