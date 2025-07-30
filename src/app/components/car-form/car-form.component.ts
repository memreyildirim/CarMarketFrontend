import {Component, createComponent} from '@angular/core';
import {CarServiceService} from "../../services/car-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BrandServiceService} from "../../services/brand-service.service";
import {Brand} from "../../models/brand";
import {CommonModule} from "@angular/common";
import {Car} from "../../models/car";
import {AddBrandDialogComponent} from "../add-brand-dialog/add-brand-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css'
})
export class CarFormComponent {

  form!: FormGroup;
  brands: Brand[] = [];
  // @ts-ignore
  car: Car ;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  private selectedBrand: number | undefined;


  constructor(private carService : CarServiceService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private brandService: BrandServiceService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      brandId: [null,Validators.required],
      model: ['', Validators.required],
      carSpecification: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1000)]],
      isNew: [false],
      engineVolume: [null, [Validators.required, Validators.min(0.5)]],
      releaseDatetime: [null, Validators.required]
    });

    this.brandService.getBrands().subscribe({
      next: data => this.brands = data,
      error: () => console.error("Brand did not get")

    });
  }
  private gotoCarList() {
    //dolduracağız

  }

  onSubmit(): void {
    this.saveCar()
  }

  saveCar(): void {
    if (this.form.valid && this.selectedFile) {
      const formValue = this.form.value;
      const formData = new FormData();

      formData.append('brandId', String(formValue.brandId));
      formData.append('model', formValue.model);
      formData.append('carSpecification', formValue.carSpecification);
      formData.append('engineVolume', formValue.engineVolume);
      formData.append('isNew', formValue.isNew);
      formData.append('price', formValue.price);
      formData.append('releaseDatetime', formValue.releaseDatetime);
      formData.append('photo', this.selectedFile); // 👈 Fotoğraf dahil

      this.carService.createCarWithPhoto(formData).subscribe({
        next: () => {console.log("Car and its photo saved succesfully!")
          this.router.navigate(['/car-list'])
          },
        error: (err) => console.error('Kayıt hatası:', err)
      });
    }
  }



  openAddBrandDialog(): void {
    const dialogRef = this.dialog.open(AddBrandDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((createdBrand: Brand) => {
      if (createdBrand) {
        this.brands = [...this.brands, createdBrand]; // 🔁 referans değişti → UI güncellenir
        this.form.get('brandId')?.setValue(createdBrand.id); // ✅ otomatik seçilir
      }
    });
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];

      // 📸 Preview için
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(this.selectedFile);
    }
  }

}

