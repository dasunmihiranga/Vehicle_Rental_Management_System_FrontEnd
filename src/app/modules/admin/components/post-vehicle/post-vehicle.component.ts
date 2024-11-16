
// post-vehicle.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-post-vehicle',
  templateUrl: './post-vehicle.component.html',
  styleUrls: ['./post-vehicle.component.scss'],
  animations: [
    trigger('messageAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class PostVehicleComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  postVehicleForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  listOfBrands = ['BMW', 'AUDI', 'FERRARI', 'TESLA', 'VOLVO', 'HONDA', 'FORD', 'TOYOTA', 'NISSAN', 'HYUNDAI', 'LEXUS', 'KIA'];
  listOfType = ['Petrol', 'Hybrid', 'Diesel', 'Electric'];
  listOfColor = ['Red', 'White', 'Blue', 'Black', 'Orange', 'Grey', 'Silver'];
  listOfTransmission = ['Manual', 'Auto'];
  listOfYears = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.postVehicleForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      colour: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required]
    });
  }

  postVehicle() {
    console.log(this.postVehicleForm.value);
  
    const formData: FormData = new FormData();
    formData.append('brand', this.postVehicleForm.get('brand')?.value || '');
    formData.append('colour', this.postVehicleForm.get('colour')?.value || '');
    formData.append('name', this.postVehicleForm.get('name')?.value || '');
    formData.append('type', this.postVehicleForm.get('type')?.value || '');
    formData.append('transmission', this.postVehicleForm.get('transmission')?.value || '');
    formData.append('description', this.postVehicleForm.get('description')?.value || '');
    formData.append('price', this.postVehicleForm.get('price')?.value || '');
    formData.append('year', this.postVehicleForm.get('year')?.value || '');
    formData.append('image', this.selectedFile!);
    
  
    console.log(formData);
    // Log FormData content
    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });
    this.isLoading = true;
    this.adminService.postCar(formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = "Vehicle Post created successfully!";
        this.errorMessage = null;
        this.autoDismissSuccess();  
  
        setTimeout(() => {
          this.router.navigateByUrl('/admin/dashboard');
        }, 2000); 
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message || "Creation failed!";
        this.successMessage = null;
        this.autoDismissError(); 
      }
    }); 
  }
  
 

  onFileSelected($event:any){
    this.selectedFile=$event.target.files[0];
    this.previewImage();


  }
  previewImage() {
    if (this.selectedFile) { 
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
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