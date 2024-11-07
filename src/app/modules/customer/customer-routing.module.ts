import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { BookVehicleComponent } from './components/book-vehicle/book-vehicle.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: CustomerDashboardComponent
  },
  {
    path:'book/:id',
    component:BookVehicleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
