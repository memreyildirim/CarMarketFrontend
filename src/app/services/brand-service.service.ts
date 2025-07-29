import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Brand} from "../models/brand";

@Injectable({
  providedIn: 'root'
})
export class BrandServiceService {

  private baseURL = "http://localhost:10160/api/v1";

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(`${this.baseURL}/brands`);
  }

  createBrand(brand:Brand): Observable<any>{
    return this.httpClient.post(`${this.baseURL}/brands`, brand);
  }

  deleteBrand(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseURL}/brands/${id}`);
  }

  updateBrand(brandId:number, brand:Brand): Observable<Brand>{
    return this.httpClient.put<Brand>(`${this.baseURL}/brands/${brandId}`, brand);
  }
}
