import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
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
export class SignupComponent {
  signupForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      checkPassword: ['', Validators.required]
    });
  }

  register() {
    if (this.signupForm.valid) {
      this.isLoading = true; 
      this.authService.register(this.signupForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = "Your account has been created successfully!";
          this.errorMessage = null;
          this.autoDismissSuccess();  
  
          
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000); 
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error.message || "Registration failed!";
          this.successMessage = null;
          this.autoDismissError(); 
        }
      });
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
