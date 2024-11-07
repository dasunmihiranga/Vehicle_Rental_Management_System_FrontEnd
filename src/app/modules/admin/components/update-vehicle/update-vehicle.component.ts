import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.scss']
})
export class UpdateVehicleComponent implements OnInit {
  // Messages
  successMessage: string | null = null;
  errorMessage: string | null = null;

  // Image handling
  existingImage: string | null = null;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  imgChanged: boolean = false;

  // Form and ID
  updateVehicleForm!: FormGroup;
  carId: number = this.activatedRoute.snapshot.params['id'];

  // Dropdown lists
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
  
  listOfYears = Array.from(
    { length: 24 }, 
    (_, i) => 2000 + i
  ); // Creates array from 2000 to 2023

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    // Initialize form with validators
    this.updateVehicleForm = this.fb.group({
      name: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      type: [null, [Validators.required]],
      colour: [null, [Validators.required]],
      transmission: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
      description: [null, [Validators.required, Validators.minLength(10)]],
      year: [null, [Validators.required]],
      image: [null] // Optional since we might not update the image
    });

    // Load existing vehicle data
    this.getCarById();
  }

  getCarById() {
    this.adminService.getCarById(this.carId).subscribe({
      next: (res) => {
        console.log('Car data received:', res);
        
        // Set existing image if available
        if (res.returnedImage) {
          this.existingImage = `data:image/jpeg;base64,${res.returnedImage}`;
        }

        // Update form with existing data
        this.updateVehicleForm.patchValue({
          name: res.name,
          brand: res.brand,
          type: res.type,
          colour: res.colour,
          transmission: res.transmission,
          price: res.price,
          description: res.description,
          year: res.year
        });
      },
      error: (error) => {
        console.error('Error fetching car data:', error);
        this.errorMessage = 'Failed to load vehicle data';
        this.autoDismissError();
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        this.errorMessage = 'Please select a valid image file (JPEG, PNG, or GIF)';
        this.autoDismissError();
        return;
      }

      // Validate file size (e.g., max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        this.errorMessage = 'Image file size should be less than 5MB';
        this.autoDismissError();
        return;
      }

      this.selectedFile = file;
      this.imgChanged = true;
      this.existingImage = null;
      this.previewImage();
    }
  }

  previewImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  updateVehicle() {
   
    const formData: FormData = new FormData();
    if(this.imgChanged && this.selectedFile){
      formData.append('image', this.selectedFile);
    }
    formData.append('brand', this.updateVehicleForm.get('brand')?.value || '');
    formData.append('colour', this.updateVehicleForm.get('colour')?.value || '');
    formData.append('name', this.updateVehicleForm.get('name')?.value || '');
    formData.append('type', this.updateVehicleForm.get('type')?.value || '');
    formData.append('transmission', this.updateVehicleForm.get('transmission')?.value || '');
    formData.append('description', this.updateVehicleForm.get('description')?.value || '');
    formData.append('price', this.updateVehicleForm.get('price')?.value || '');
    formData.append('year', this.updateVehicleForm.get('year')?.value || '');
    
    
  
    console.log(formData);

    // Send update request
    this.adminService.updateCar(this.carId, formData).subscribe({
      next: () => {
        this.successMessage = 'Vehicle updated successfully!';
        this.autoDismissSuccess();
        
        // Navigate after showing success message
        setTimeout(() => {
          this.router.navigateByUrl('/admin/dashboard');
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Update failed. Please try again.';
        this.autoDismissError();
      }
    });
  }

  // Auto-dismiss success message after 2 seconds
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

  // Helper method to check if form field is invalid
  isFieldInvalid(fieldName: string): boolean {
    const field = this.updateVehicleForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  // Helper method to get error message for a field
  getErrorMessage(fieldName: string): string {
    const field = this.updateVehicleForm.get(fieldName);
    if (!field) return '';

    if (field.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field.hasError('min')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be greater than 0`;
    }
    if (field.hasError('minlength')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least 10 characters`;
    }

    return '';
  }
}