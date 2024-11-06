import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  constructor(private adminService: AdminService, private router: Router) {}
  successMessage: string | null = null;
  errorMessage: string | null = null;

  cars: any = [];

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe((res: any[]) => {
      // res is typed as any[]
      console.log(res);
      res.forEach((element: any) => {
        // element typed as any
        element.processedImg =
          'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    });
  }

  deleteCar(id: number) {
    // console.log(id);
    // this.adminService.deleteCar(id).subscribe((res)=>{
    //   this.getAllCars();
    //   console.log(res);
      
    // });


    this.adminService.deleteCar(id).subscribe({
      next: () => {
        this.getAllCars();
        this.successMessage = 'Your account has been created successfully!';
        this.errorMessage = null;
        this.autoDismissSuccess(); // Call the auto dismiss method

        // Navigate to the login page after a delay to show the success message
        setTimeout(() => {
          this.router.navigateByUrl('/admin/dashboard');
        }, 2000); // Delay of 5 seconds for the success message
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Registration failed!';
        this.successMessage = null;
        this.autoDismissError(); // Call the auto dismiss method
      },
    });
  }

  autoDismissSuccess() {
    setTimeout(() => {
      this.successMessage = null;
    }, 2000); // 5000 milliseconds = 5 seconds
  }

  // Auto-dismiss error message after 5 seconds
  autoDismissError() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 5000); // 5000 milliseconds = 5 seconds
  }
}
