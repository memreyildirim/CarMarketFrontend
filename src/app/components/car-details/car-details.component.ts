import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CarServiceService} from "../../services/car-service.service";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [

    CurrencyPipe,
    DatePipe,
    MatCardContent,
    MatCardTitle,
    MatCard
  ],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent {
  car: any;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarServiceService) {
  }

  ngOnInit() {
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
}
