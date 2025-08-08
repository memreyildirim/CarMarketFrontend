import {ChangeDetectorRef, Injectable} from '@angular/core';
import {CartItem} from "../models/cartItem";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  addItem(item: CartItem) {
    const current = this.itemsSubject.getValue();
    const existingItem = current.find(i => i.carId === item.carId);

    let updated: CartItem[];

    if (existingItem) {
      // quantity artır
      updated = current.map(i =>
        i.carId === item.carId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    } else {
      // yeni item ekle
      updated = [...current, item];
    }

    this.itemsSubject.next(updated);
    alert("Car added to cart!")
  }


  private items: CartItem[] = [];

  constructor(private httpClient: HttpClient) {

  }

  /* eğer db de tutulacaksa bu şekilde istek atılır
  add(item: CartItem): Observable<CartItem>{
    return this.httpClient.post<CartItem>(this.baseURL,item);
  }
    */

  getItems(): CartItem[] {
    return [...this.items];
  }


/*
  removeItem(carId: number): void {
    this.items = this.items.filter(item => item.carId !== carId);
    this.itemsSubject.next(this.items);
    this.updateStorage();
  }

 */

  removeItem(carId: number): void {
    console.log("items before:", this.items.map(i => i.carId));

    console.log("Removing carId:", carId);

    const filtered = this.items.filter(item => {
      console.log("Checking item:", item.carId, "vs", carId);
      return item.carId !== carId;
    });

    console.log("After remove:", filtered);

    this.items = filtered;
    this.itemsSubject.next(this.items);
    localStorage.setItem("cart", JSON.stringify(this.items));
  }



  clearCart(): void {
    this.items = [];
    localStorage.removeItem("carId");
    this.itemsSubject.next([]);
    console.log("clear cart  metot çalıştı");
    console.log(localStorage.getItem("cart"));
  }

  private updateStorage(): void {
    localStorage.setItem("carId", JSON.stringify(this.items));  }


}
