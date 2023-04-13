import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'firebase/auth';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private loginService:LoginService, private router:Router){}
  private unsubscribeAuth!: Unsubscribe;

  isUserLogged!:boolean

  ngOnInit(): void {
    
    this.unsubscribeAuth = this.loginService.initAuthListener((loggedIn) => {
      this.isUserLogged = loggedIn;
    });

  }

  ngOnDestroy():void {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth();
    }
  }

  hamburgerMenuToggle():void {
    document.getElementById("hamburger-menu")?.classList.toggle("open");
    document.getElementById("clean-modal")?.classList.toggle("display-clean-modal");
  }

  onLogoClickRemoveMenu():void {
    document.getElementById("hamburger-menu")?.classList.remove("open");
    document.getElementById("clean-modal")?.classList.add("display-clean-modal");
  }

  logOut() {
    this.loginService.logOut();
    this.hamburgerMenuToggle();
    this.router.navigateByUrl('');
  }

}
