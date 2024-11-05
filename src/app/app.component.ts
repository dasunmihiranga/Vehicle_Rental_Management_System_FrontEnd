import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vehicle_rental';

  isCustomerLoggedIn:boolean=StorageService.isCustomerLoginIn();
  isAdminLoggedIn:boolean=StorageService.isAdminLoginIn();

  constructor(private router:Router){}

  ngOnInit(){
    this.router.events.subscribe(event=>{
      if(event.constructor.name === "NavigationEnd"){
        this.isCustomerLoggedIn = StorageService.isCustomerLoginIn();
        this.isAdminLoggedIn = StorageService.isAdminLoginIn();
      }
    })
  }

}
