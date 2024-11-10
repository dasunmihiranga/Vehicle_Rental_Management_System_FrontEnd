import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss'],
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
export class SearchCarComponent {

  successMessage: string | null = null;
  errorMessage: string | null = null;

  searchCarForm !: FormGroup;
  cars:any=[];
  listOfBrands = [
    'BMW', 'AUDI', 'FERRARI', 'TESLA', 'VOLVO', 
    'HONDA', 'FORD', 'TOYOTA', 'NISSAN', 'HYUNDAI', 
    'LEXUS', 'KIA'
  ];
  
  listOfType = ['Petrol', 'Hybrid', 'Diesel', 'Electric'];
  
  listOfColor = [
    'Red', 'White', 'Blue', 'Black', 
    'Orange', 'Grey', 'Silver'
  ];
  
  listOfTransmission = ['Manual', 'Auto'];
  

  constructor(private fb:FormBuilder,
    private adminService:AdminService
  ){
    this.searchCarForm=fb.group({
      brand:[null],
      type:[null],
      transmission:[null],
      colour:[null],
    });
  }

  searchCar(){

    this.cars = [];
  
    console.log(this.searchCarForm.value);
    this.adminService.searchCar(this.searchCarForm.value).subscribe((res:any)=>{
      console.log(res);
      res.carList.forEach((element: any) => {
        element.processedImg =
          'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
      // Populate the car list with the returned data
    })

  }

  deleteCar(id: number) {
   


    this.adminService.deleteCar(id).subscribe({
      next: () => {
        this.successMessage = 'Deleted  successfully!';
        this.cars = [];
        this.errorMessage = null;
        this.autoDismissSuccess(); // Call the auto dismiss method

        
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Deleted failed!';
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
