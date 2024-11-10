import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { BookVehicleComponent } from './components/book-vehicle/book-vehicle.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { SearchCarComponent } from './components/search-car/search-car.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: CustomerDashboardComponent
  },
  {
    path:'book/:id',
    component:BookVehicleComponent
  },
  {
    path:'my_bookings',
    component:MyBookingsComponent
  },
  {
    path:'search',component:SearchCarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
