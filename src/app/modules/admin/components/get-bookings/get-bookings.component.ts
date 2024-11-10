import { Component, OnInit } from '@angular/core';
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
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        ),
      ]),
    ]),
  ],
})
export class GetBookingsComponent implements OnInit {
  bookings: any = [];
  filterBookings: any = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getBookings();
  }

  private resetBookings(): void {
    this.bookings = [];
    this.filterBookings = [];
  }

  private formatDate(date: string | number | Date): string {
    try {
      return new Date(date).toISOString().split('T')[0];
    } catch (error) {
      return String(date);
    }
  }

  getBookings(): void {
    this.resetBookings();
    
    this.adminService.getCarBookings().subscribe({
      next: (res: any) => {
        // Format dates for all bookings
        res.forEach((booking: any) => {
          booking.fromDate = this.formatDate(booking.fromDate);
          booking.toDate = this.formatDate(booking.toDate);
        });

        // Separate pending and non-pending bookings
        res.forEach((booking: any) => {
          if (booking.bookCarStatus === 'PENDING') {
            this.bookings.push(booking);
          } else {
            this.filterBookings.push(booking);
          }
        });
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch bookings';
        this.autoDismissError();
      }
    });
  }

  changeBookingStatus(id: number, status: string): void {
    // Find the booking that's being updated
    const bookingToMove = this.bookings.find((booking: any) => booking.id === id);
    
    this.adminService.changeBookingStatus(id, status).subscribe({
      next: (res) => {
        this.successMessage = 'Booking Status changed successfully';
        this.errorMessage = null;
        this.autoDismissSuccess();
        
        // Refresh the lists to ensure synchronization with backend
        setTimeout(() => {
          this.resetBookings();
          this.getBookings();
        }, 1000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Something went wrong';
        this.successMessage = null;
        this.autoDismissError();
      },
    });
  }

  autoDismissSuccess(): void {
    setTimeout(() => {
      this.successMessage = null;
    }, 1000);
  }

  autoDismissError(): void {
    setTimeout(() => {
      this.errorMessage = null;
    }, 5000);
  }
}