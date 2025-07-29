import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Brand} from "../../models/brand";
import {BrandServiceService} from "../../services/brand-service.service";
import {Car} from "../../models/car";
import {CarServiceService} from "../../services/car-service.service";

@Component({
  selector: 'app-car-update',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './car-update.component.html',
  styleUrl: './car-update.component.css'
})
export class CarUpdateComponent {

  form!: FormGroup;
  brands: Brand[] = [];
  // @ts-ignore
  car: Car = {} as Car;

  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private brandService: BrandServiceService,
              private carService: CarServiceService) {
  }


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carService.getCarById(+id).subscribe({
        next: data => {
          this.car = data;

          this.form.patchValue({
            brandId: data.brand?.id,
            model: data.model,
            carSpecification: data.carSpecification,
            price: data.price,
            isNew: data.isNew,
            engineVolume: data.engineVolume,
            releaseDatetime: data.releaseDatetime
          });
          console.log("brands",this.brands);
          console.log("data.brand", data.brand);
          console.log("brand Id",data.brand.id)
        },
        error: () => console.error("Araba verisi alınamadı")
      });
    }

    this.brandService.getBrands().subscribe({
      next: data => this.brands = data
    });

    this.form = this.fb.group({
      brandId: [null, Validators.required],
      model: ['', Validators.required],
      carSpecification: ['', Validators.required],
      price: [null, Validators.required],
      isNew: [false],
      engineVolume: [null, Validators.required],
      releaseDatetime: ['', Validators.required]
    });
  }


  onSubmit(): void {
    this.updateCar()
  }


  updateCar(): void {
    if (this.form.valid) {
      const formValue = this.form.value;

      const updatedCar: Car = {
        carId: this.car.carId,
        brand: { id: formValue.brandId, brandName: '' },
        brandName: formValue.brandName,
        model: formValue.model,
        carSpecification: formValue.carSpecification,
        engineVolume: formValue.engineVolume,
        isNew: formValue.isNew,
        price: formValue.price,
        releaseDatetime: formValue.releaseDatetime
      };

      this.carService.updateCar(updatedCar.carId, updatedCar).subscribe({
        next: () => this.router.navigate(['/car-list']),
        error: (err) => console.error('Update error:', err)
      });
    }
  }


}
