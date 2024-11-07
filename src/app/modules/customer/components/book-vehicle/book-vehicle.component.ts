import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/auth/services/storage/storage.service';


@Component({
  selector: 'app-book-vehicle',
  templateUrl: './book-vehicle.component.html',
  styleUrls: ['./book-vehicle.component.scss']
})
export class BookVehicleComponent {

  carId:number=this.activatedRoute.snapshot.params["id"];

  processedImage:any;
  car:any;
  validationForm!: FormGroup;
  dateFormat:string="DD-MM-YYYY";
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private service: CustomerService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
            
  ){}

  ngOnInit() {
    this.validationForm=this.fb.group({
      toDate:[null,Validators.required],
      fromDate:[null,Validators.required],
    })
    this.getCarById();

  }

  getCarById(){
    this.service.getCarById(this.carId).subscribe((res)=>{
      console.log(res);
      this.processedImage = 'data:image/jpeg;base64,'+res.returnedImage;
      this.car=res;
    })
  }

  bookACar(data:any) {
    let bookACar={
          fromDate:data.fromDate,
          toDate:data.toDate,
          userId:StorageService.getUserId(),
          carId:this.carId
    }
   
    this.service.bookCar(bookACar).subscribe({
      next: () => {
        this.successMessage = 'Booking  successfully!';
        this.errorMessage = null;
        this.autoDismissSuccess();

       
        setTimeout(() => {
          this.router.navigateByUrl('/customer/dashboard');
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Booking failed!';
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


  autoDismissError() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 5000); 
  }

}
