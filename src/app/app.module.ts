import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// DEFAULT
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

// COMPONENT
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './pages/_Landing-Page/hero/hero.component';
import { PreviewProjectsListComponent } from './pages/_Landing-Page/preview-projects-list/preview-projects-list.component';
import { PreviewPostsListComponent } from './pages/_Landing-Page/preview-posts-list/preview-posts-list.component';
import { PreviewCoursesListComponent } from './pages/_Landing-Page/preview-courses-list/preview-courses-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { StudentProjectsListComponent } from './pages/student-projects-list/student-projects-list.component';
import { LandingPageComponent } from './pages/_Landing-Page/landing-page/landing-page.component';
import { TeacherPostsListComponent } from './pages/teacher-posts-list/teacher-posts-list.component';
import { CoursesListComponent } from './pages/courses-list/courses-list.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

// FIREBASE
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { CreateFormComponent } from './pages/create-form/create-form.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    PreviewProjectsListComponent,
    PreviewPostsListComponent,
    PreviewCoursesListComponent,
    FooterComponent,
    StudentProjectsListComponent,
    LandingPageComponent,
    TeacherPostsListComponent,
    CoursesListComponent,
    LoginPageComponent,
    CreateFormComponent,
    EditPageComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
