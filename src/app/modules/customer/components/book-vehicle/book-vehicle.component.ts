import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-vehicle',
  templateUrl: './book-vehicle.component.html',
  styleUrls: ['./book-vehicle.component.scss']
})
export class BookVehicleComponent {

  carId:number=this.activatedRoute.snapshot.params["id"];

  processedImage:any;
  car:any;

  constructor(private service: CustomerService,
              private activatedRoute: ActivatedRoute
  ){}

  ngOnInit() {
    this.getCarById();
  }

  getCarById(){
    this.service.getCarById(this.carId).subscribe((res)=>{
      console.log(res);
      this.processedImage = 'data:image/jpeg;base64,'+res.returnedImage;
      this.car=res;
    })
  }

}
