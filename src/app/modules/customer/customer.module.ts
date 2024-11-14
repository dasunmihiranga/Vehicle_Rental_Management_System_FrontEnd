import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { CustomerHeaderComponent } from './components/customer-header/customer-header.component';
import { BookVehicleComponent } from './components/book-vehicle/book-vehicle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    BookVehicleComponent,
    MyBookingsComponent,
    SearchCarComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CustomerModule { }
