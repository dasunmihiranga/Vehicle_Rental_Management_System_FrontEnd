import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { DefaultpageComponent } from './auth/components/defaultpage/defaultpage.component';

const routes: Routes = [
  {path: 'register',component: SignupComponent
  },
  {
    path:'login',component: LoginComponent
  },
  {
    path:'',component:DefaultpageComponent

  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
