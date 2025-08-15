import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from "@angular/forms";
import {BrandServiceService} from "../../services/brand-service.service";
import {Brand} from "../../models/brand";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-add-brand-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatInputModule,
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    MatSnackBarModule,
    MatButton,
    MatDialogTitle,
  ],
  templateUrl: './add-brand-dialog.component.html',
  styleUrl: './add-brand-dialog.component.css'
})

export class AddBrandDialogComponent {
  brandName= ''



  constructor(private brandService : BrandServiceService,
              private dialogRef: MatDialogRef<AddBrandDialogComponent>,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {

  }

  addBrand(): void {
    const trimmedName = this.brandName.trim();

    if (trimmedName.length < 2) {
      alert('Brand name must be at least 2 characters!');
      return;
    }

    const newBrand: Brand = { brandName: trimmedName };

    this.brandService.createBrand(newBrand).subscribe({
      next: (createdBrand) => {
        alert('Brand successfully added!');
        this.dialogRef.close(createdBrand); // sadece başarılı eklemede kapanır
      },
      error: (err) => {
        if (err.status === 409) {
          alert('This brand already exists!');
        } else {
          alert('Unexpected server error occurredmmmmm!');
          console.error('Server Error:', err);
        }
      }
    });
  }






  cancel() {
    this.dialogRef.close();
  }
}
