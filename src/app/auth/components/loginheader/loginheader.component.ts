import { Component} from '@angular/core';

@Component({
  selector: 'app-loginheader',
  templateUrl: './loginheader.component.html',
  styleUrls: ['./loginheader.component.scss']
})
export class LoginheaderComponent {
  isMobileMenuOpen = false; 

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

}
