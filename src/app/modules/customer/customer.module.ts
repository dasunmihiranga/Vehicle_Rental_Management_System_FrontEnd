import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { CustomerHeaderComponent } from './components/customer-header/customer-header.component';
import { BookVehicleComponent } from './components/book-vehicle/book-vehicle.component';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    BookVehicleComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
