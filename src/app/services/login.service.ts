import { Injectable } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { Auth } from "@angular/fire/auth";
import { signInWithEmailAndPassword,onAuthStateChanged, signOut, Unsubscribe  } from 'firebase/auth';
import { Router } from "@angular/router";

@Injectable({
    providedIn:'root'
})
export class LoginService {

    constructor(private authService: Auth, private router:Router) {}

    isUserLogged:boolean = false

    // Default login function provided by FireBase
    logIn(email: string, password: string) {
        signInWithEmailAndPassword(this.authService, email, password)
        .then(() => {
            this.router.navigateByUrl('')
            console.log('Connexion réussie');
        })
        .catch((error: any) => {
            console.error('Erreur lors de la connexion:', error);
            alert('Une erreur est survenue !' + error)
        });
    }

    // Function used in the login-page component
    signIn(form: FormGroup): void {
        this.logIn(form.value.email, form.value.password)
    }

    // initAuthListener checks if the user is connected
    initAuthListener(updateLoginStatus: (loggedIn: boolean) => void): Unsubscribe {
        return onAuthStateChanged(this.authService, (user) => {
            if (user) {
                updateLoginStatus(true);
            } else {
                updateLoginStatus(false);
            }
        });
    }
    
    
    // Default logout function provided by Firebase
    logOut() {
        signOut(this.authService)
        .then(() => {
            console.log('Déconnexion réussie');
        })
        .catch((error: any) => {
            console.error('Erreur lors de la déconnexion:', error);
        });
    }
}
