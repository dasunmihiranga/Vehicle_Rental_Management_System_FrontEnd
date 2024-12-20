import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { PostVehicleComponent } from './components/post-vehicle/post-vehicle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdateVehicleComponent } from './components/update-vehicle/update-vehicle.component';
import { GetBookingsComponent } from './components/get-bookings/get-bookings.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    PostVehicleComponent,
    UpdateVehicleComponent,
    GetBookingsComponent,
    SearchCarComponent,

    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AdminModule { }
