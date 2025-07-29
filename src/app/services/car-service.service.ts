import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car} from "../models/car";
import {Brand} from "../models/brand";


@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  private baseURL = "http://localhost:10160/api/v1";

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${this.baseURL}/cars`)
  }


  createCar(car:Car): Observable<any>{
    return this.httpClient.post(`${this.baseURL}/cars`, car);
  }

  getCarById(carId: number): Observable<Car> {
    return this.httpClient.get<Car>(`${this.baseURL}/cars/${carId}`)
  }

  deleteCar(carId:number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseURL}/cars/${carId}`)
  }

  updateCar(carId:number, car: Car): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/cars/${carId}`,car)
  }

  getAllBrands(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(`${this.baseURL}/brands`)
  }



  createCarWithPhoto(formData: FormData): Observable<Car> {
    return this.httpClient.post<Car>('/api/cars', formData);
  }


}
