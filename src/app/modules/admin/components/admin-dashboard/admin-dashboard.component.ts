import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  constructor(private adminService: AdminService){}
  
  cars:any=[];

  ngOnInit(){
    this.getAllCars();

  }

  getAllCars() {
    this.adminService.getAllCars().subscribe((res: any[]) => { // res is typed as any[]
      console.log(res);
      res.forEach((element: any) => { // element typed as any
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    });
  }


  

}
