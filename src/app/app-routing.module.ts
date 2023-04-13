import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './pages/courses-list/courses-list.component';
import { CreateFormComponent } from './pages/create-form/create-form.component';
import { LandingPageComponent } from './pages/_Landing-Page/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { StudentProjectsListComponent } from './pages/student-projects-list/student-projects-list.component';
import { TeacherPostsListComponent } from './pages/teacher-posts-list/teacher-posts-list.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';

const routes: Routes = [
  {path:"", component:LandingPageComponent},
  {path:"students", component:StudentProjectsListComponent},
  {path:"posts", component:TeacherPostsListComponent},
  {path:"courses", component:CoursesListComponent},
  {path:"login", component:LoginPageComponent},
  {path:"create", component:CreateFormComponent},
  {path:"edit", component:EditPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
