import { Component } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm !: FormGroup;
    constructor(private fb: FormBuilder){

    }
    ngOnInit(){
      this.loginForm = this.fb.group({
          email: [null, [Validators.email,Validators.required]],
          password: [null, [Validators.required]]
      });
    }
    login(){
      console.log(this.loginForm.value);
      
    }
}
