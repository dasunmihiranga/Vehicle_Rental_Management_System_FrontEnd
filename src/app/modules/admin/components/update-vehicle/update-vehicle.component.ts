import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.scss']
})
export class UpdateVehicleComponent {

  successMessage: string | null = null;
  errorMessage: string | null = null;

  
  existingImage:string|null=null;
  carId : number =this.activiatedRoute.snapshot.params['id'];

  updateVehicleForm!: FormGroup;

  listOfBrands = ['BMW', 'AUDI', 'FERRARI', 'TESLA', 'VOLVO', 'HONDA', 'FORD', 'TOYOTA', 'NISSAN', 'HYUNDAI', 'LEXUS', 'KIA'];
  listOfType = ['Petrol', 'Hybrid', 'Diesel', 'Electric'];
  listOfColor = ['Red', 'White', 'Blue', 'Black', 'Orange', 'Grey', 'Silver'];
  listOfTransmission = ['Manual', 'Auto'];
  listOfYears = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];


  constructor(private adminService: AdminService,
              private activiatedRoute: ActivatedRoute,
              private fb:FormBuilder,
              private router:Router) { }
  

  
   ngOnInit(){
    this.updateVehicleForm=this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      colour: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required]
    })
    this.getCarById();

   }

   updateVehicle() {
     
  }
  
   getCarById(){
     this.adminService.getCarById(this.carId).subscribe((res=>{
       console.log(res);
       const carDto  = res;
       this.existingImage=`data:image/jpeg;base64,${res.returnedImage}`;
       console.log(carDto);

       this.updateVehicleForm.patchValue(carDto);
       
     }))
   }




}


