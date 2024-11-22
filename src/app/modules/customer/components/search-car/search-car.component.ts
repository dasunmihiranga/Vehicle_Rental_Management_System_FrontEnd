import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss']
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
    private customerService:CustomerService
  ){
    this.searchCarForm=this.fb.group({
      brand:[null],
      type:[null],
      transmission:[null],
      colour:[null],
    });
  }

  searchCar(){

    this.cars = [];
  
    console.log(this.searchCarForm.value);
    this.customerService.searchCar(this.searchCarForm.value).subscribe((res:any)=>{
      console.log(res);
      res.carList.forEach((element: any) => {
        element.processedImg =
          'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    })

  }


}
