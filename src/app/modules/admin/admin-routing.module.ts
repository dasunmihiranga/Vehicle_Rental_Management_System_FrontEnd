import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostVehicleComponent } from './components/post-vehicle/post-vehicle.component';
import { UpdateVehicleComponent } from './components/update-vehicle/update-vehicle.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: AdminDashboardComponent
  },
  {
    path: "car", component:PostVehicleComponent
  },
  {
    path:"car/:id",component:UpdateVehicleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
