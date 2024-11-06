import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import{NzSpinModule} from 'ng-zorro-antd/spin';
import{NzFormModule} from 'ng-zorro-antd/form';
import{NzButtonModule} from 'ng-zorro-antd/button';
import{NzInputModule} from 'ng-zorro-antd/input';
import{NzLayoutModule} from 'ng-zorro-antd/layout';
import { LoginheaderComponent } from './auth/components/loginheader/loginheader.component';
import { DefaultpageComponent } from './auth/components/defaultpage/defaultpage.component';
import { AdminHeaderComponent } from './modules/admin/components/admin-header/admin-header.component';
import { CustomerHeaderComponent } from './modules/customer/components/customer-header/customer-header.component';

import { PostVehicleComponent } from '../app/modules/admin/components/post-vehicle/post-vehicle.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LoginheaderComponent,
    DefaultpageComponent,
    AdminHeaderComponent,
    CustomerHeaderComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule, 

    
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
