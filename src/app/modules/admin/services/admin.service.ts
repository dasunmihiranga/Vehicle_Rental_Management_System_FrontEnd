import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASE_URL=['http://localhost:8080']
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  
  postCar(carDto:any):Observable<any>{
    return this.http.post(`${BASE_URL}/api/admin/car`,carDto,{
      headers:this.createAuthorizationHeader()
    });
  }

  getAllCars():Observable<any>{
    return this.http.get(`${BASE_URL}/api/admin/cars`,{
      headers : this.createAuthorizationHeader()
    })
  }


  deleteCar(id:number):Observable<any>{
    return this.http.delete(`${BASE_URL}/api/admin/car/${id}`);
  }


  createAuthorizationHeader(): HttpHeaders {
    let authHeadeaders: HttpHeaders = new HttpHeaders();
    return authHeadeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }

}
