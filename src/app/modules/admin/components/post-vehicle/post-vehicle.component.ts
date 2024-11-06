import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-post-vehicle',
  templateUrl: './post-vehicle.component.html',
  styleUrls: ['./post-vehicle.component.scss']
})
export class PostVehicleComponent {

  postVehicleForm !: FormGroup;
  selectedFile : File |null=null;
  imagePreview:string |ArrayBuffer|null=null;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands=["BMW","AUDI","FERARI","TESLA","VOLVO","HONDA","FORD","TOYOTA","NISSAN","HYUNDAI","LEXUS","KIA"];
  listOfType=["Petrol","Hybrid","Diesel","Electric"];
  listOfColor=["Red","White","Bule","Black","Orange","Grey","Sliver"];
  listOfTransmission=["Manual","Auto"];
  listOfYears=[2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023];


  constructor(private fb: FormBuilder,
    private adminService:AdminService

  ){}
  ngOnInit(){
    this.postVehicleForm = this.fb.group({
      model:[null,Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color:[null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
     

    })


  }
  postVehicle() {
    console.log(this.postVehicleForm.value);
  
    const formData: FormData = new FormData();

    const year = this.postVehicleForm.get('year')?.value;
  const yearAsDate = new Date(parseInt(year), 0, 1);
   
    
    formData.append('brand', this.postVehicleForm.get('brand')?.value || '');
    formData.append('colour', this.postVehicleForm.get('color')?.value || '');
    formData.append('name', this.postVehicleForm.get('model')?.value || '');
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

    this.adminService.postCar(formData).subscribe(
      (res)=>{
      console.log(res);

    },(error)=>{
      console.log("error--->"+error);
      
    })
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
  

}
