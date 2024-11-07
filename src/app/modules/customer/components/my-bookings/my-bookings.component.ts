import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent {
    constructor(private service: CustomerService,
                private router :Router
    ){}

    getMyBookings(){
      this.service.getBookingByUserId().subscribe((res)=>{
        console.log(res);
        
        
      })
    }

}
