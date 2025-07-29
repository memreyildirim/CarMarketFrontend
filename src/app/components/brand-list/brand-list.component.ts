import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BrandServiceService} from "../../services/brand-service.service";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from "@angular/material/table";
import {MatFormField} from "@angular/material/form-field";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {Brand} from "../../models/brand";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [
    FormsModule,
    MatTable,
    MatFormField,
    MatButton,
    MatInput,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatIconModule,
    NgIf,
    MatFormFieldModule,
    MatCard
  ],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.css',
  encapsulation: ViewEncapsulation.None
})
export class BrandListComponent implements OnInit {
  displayedColumns: string[] = ["brandName","actions"];
  brands: Brand[] = [];
  newBrandName = '';
  selectedBrand: Brand | null = null;
  editingBrandId: number | null = null;
  editedBrandName: string = '';

  constructor(private router: Router,
              private httpClient: HttpClient,
              private brandService: BrandServiceService) {
  }

  ngOnInit() {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(data => {
      this.brands = data;
    })
  }

  addBrand() {
    const trimmed = this.newBrandName.trim();
    if (trimmed.length <= 2) {
      alert('Brand name must be at least 2 charecters!');
      return;
    }

    const brand : Brand = {brandName: trimmed};
    this.brandService.createBrand(brand).subscribe({
      next: (created) => {
        this.brands = [...this.brands, created]; /** yeni ekleme yapıldığında otomatik olarak tabloyu günceller    */
        this.newBrandName = '';
        alert("Brand added successfully!");
      },
      error: (err) => {
        if (err.status === 409) {
          alert('This brand already exists!');
        } else {
          alert('Server error!');
        }
      }
    });
  }

  deleteBrand(id: number) {
    this.brandService.deleteBrand(id).subscribe({
      next: () => {
        this.brands = this.brands.filter(brand => brand.id !== id); // DOM'dan silinen id'yi çıkart
        alert("Brand deleted successfully!");
      },
      error: (err) => {
        console.log("Can't delete brand", err);
        alert("Server error!");
      }
    });

  }

  editBrand(id: number): void {
    const brand = this.brands.find(b => b.id === id);
    if (brand) {
      this.editingBrandId = id;
      this.editedBrandName = brand.brandName;
    }
  }

  updateBrand(id: number): void {
    const trimmedName = this.editedBrandName.trim();
    if (trimmedName.length < 2) {
      alert('Marka adı en az 2 karakter olmalı!');
      return;
    }

    this.brandService.updateBrand(id, { brandName: trimmedName }).subscribe({
      next: (updatedBrand) => {
        this.brands = this.brands.map(b => b.id === id ? updatedBrand : b);
        this.editingBrandId = null;
        this.editedBrandName = '';
        alert('Marka güncellendi!');
      },
      error: (err) => {
        if (err.status === 409) {
          alert('Bu marka zaten mevcut!');
        } else {
          console.error('Update hatası:', err);
          alert('Marka güncellenemedi!');
        }
      }
    });
  }

  cancelEdit(): void {
    this.editingBrandId = null;
    this.editedBrandName = '';
  }

  }
