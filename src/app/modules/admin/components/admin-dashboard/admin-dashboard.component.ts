import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  animations: [
    trigger('messageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' })),
      ]),
    ]),
  ],
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
      console.log(res);
      res.forEach((element: any) => {
        element.processedImg =
          'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    });
  }

  deleteCar(id: number) {
  
    this.adminService.deleteCar(id).subscribe({
      next: () => {
        this.cars = [];
        this.getAllCars();
        this.successMessage = 'Deleted  successfully!';
        this.errorMessage = null;
        this.autoDismissSuccess();

        setTimeout(() => {
          this.router.navigateByUrl('/admin/dashboard');
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Deleted failed!';
        this.successMessage = null;
        this.autoDismissError();
      },
    });
  }

  autoDismissSuccess() {
    setTimeout(() => {
      this.successMessage = null;
    }, 2000);
  }

  // Auto-dismiss error message after 5 seconds
  autoDismissError() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 5000); 
  }
}
