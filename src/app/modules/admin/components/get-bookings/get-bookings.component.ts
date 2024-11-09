import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrls: ['./get-bookings.component.scss'],
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
export class GetBookingsComponent {

  bookings:any;
  successMessage: string | null = null;
  errorMessage: string | null = null;


  constructor(private adminService: AdminService){
    this.getBookings();
  }

  getBookings(){
    this.adminService.getCarBookings().subscribe((res)=>{
      console.log(res);
      res.forEach((resElement: { fromDate: string | number | Date; toDate: string | number | Date }) => {
        resElement.fromDate = new Date(resElement.fromDate).toISOString().split("T")[0];
        resElement.toDate = new Date(resElement.toDate).toISOString().split("T")[0];
    });
      this.bookings = res;

    });
  }

  changeBookingStatus(id: number, status: string){
      console.log(id ,status);


      this.adminService.changeBookingStatus(id,status).subscribe({
        next: (res) => {
          console.log(res);
          this.successMessage = 'Booking Status changed successfully';
          this.getBookings();
          this.errorMessage = null;
          this.autoDismissSuccess();
        },
        error: (err) => {
          this.errorMessage = 'Something went wrong'|| err.error.message;
          this.successMessage = null;
          this.autoDismissError(); // Call the auto dismiss method
        },
      });

      
  }
  
  autoDismissSuccess() {
    setTimeout(() => {
      this.successMessage = null;
    }, 3000); 
  }

  // Auto-dismiss error message after 5 seconds
  autoDismissError() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 5000);
  }


}
