import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CarServiceService} from "../../services/car-service.service";
import {CurrencyPipe, DatePipe, NgIf} from "@angular/common";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {AuthServiceService} from "../../services/auth-service.service";
import {Car} from "../../models/car";
import {CartItem} from "../../models/cartItem";
import {CartServiceService} from "../../services/cart-service.service";

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [

    CurrencyPipe,
    DatePipe,
    NgIf
  ],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent {
  car: any;
  isAdmin: boolean = false;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarServiceService,
              private authService: AuthServiceService,
              private cartService: CartServiceService) {
  }

  ngOnInit() {

    this.isAdmin = this.authService.isAdmin() //admin login check

    const id  = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carService.getCarById(+id).subscribe(data => {
        console.log("Gelen veri:", data);
        this.car = data;
      });

    }
  }



  deleteCar() {
      this.carService.deleteCar(this.car.carId).subscribe({
        next: () => {
          this.router.navigate(['car-list']);
        },
        error: err => {
          console.log("Error in delete processes:", err);
        }
      });

  }


  updateCar(carId: number) {
    this.router.navigate(['update-car', carId]);
  }

  addToCart(car: Car):void {
    const item: CartItem = {
      carId: car.carId,
      carBrand: car.brand.brandName,
      carModel: car.model,
      price: car.price,
      quantity: 1,
    }


    console.log("added to cart metodu çalıştı",car)
    if (car){
      console.log(`${car.brandName} sepete eklendi `)
      this.cartService.addItem(item);
    }else {
      console.warn("car bilgisi boş ya da undefined")
    }

  }
}
