import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { trigger, style, transition, animate } from '@angular/animations';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
export class LoginComponent {
  loginForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  login() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.userId != null) {
          const user = {
            id: res.userId,
            role: res.userRole
          };

          StorageService.saveUser(user);
          StorageService.saveToken(res.jwt);

          this.successMessage = "Login successfully!";
          this.errorMessage = null;
          this.autoDismissSuccess(); // Call the auto dismiss method

          // Navigate after a delay to show the success message
          setTimeout(() => {
            if (StorageService.isAdminLoginIn()) {
              this.router.navigateByUrl('/admin/dashboard');
            } else if (StorageService.isCustomerLoginIn()) {
              this.router.navigateByUrl('/customer/dashboard');
            }
          }, 1000); // Delay of 2 seconds for the success message
        }
      },
      error: (err) => {
        this.errorMessage = "Login failed!";
        this.successMessage = null;
        this.autoDismissError(); // Call the auto dismiss method
      }
    });
  }

  // Auto-dismiss success message after 2 seconds
  autoDismissSuccess() {
    setTimeout(() => {
      this.successMessage = null;
    }, 2000); // 2000 milliseconds = 2 seconds
  }

  // Auto-dismiss error message after 5 seconds
  autoDismissError() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 5000); // 5000 milliseconds = 5 seconds
  }
}
