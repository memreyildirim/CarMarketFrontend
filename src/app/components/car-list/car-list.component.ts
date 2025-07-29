import {Component, ViewChild} from '@angular/core';
import {Car} from "../../models/car";
import {HttpClient} from "@angular/common/http";
import {CarServiceService} from "../../services/car-service.service";
import {Router} from "@angular/router";
import {CommonModule, CurrencyPipe, NgForOf} from "@angular/common";
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table'
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";



@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    NgForOf,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    CurrencyPipe,
    MatSelectionList,
    FormsModule,
    MatListOption,
    MatFormField,
    MatInput,
    MatLabel,
    CommonModule,
    MatSliderModule
  ],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent {

  displayedColumns: string[] = ['photo','brand','model','price','actions']
  dataSource = new MatTableDataSource<Car>();


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Car>;
  protected brandList: string[] = [];

  constructor(private httpClient: HttpClient,
              private carService: CarServiceService,
              private router: Router) {

  }


  ngOnInit() {

    this.loadCars();
    this.loadAllBrands();


  }

  @ViewChild(MatPaginator) set matPaginator(p: MatPaginator) {
    this.dataSource.paginator = p;
    this.triggerTableSync();
  }

  @ViewChild(MatSort) set matSort(s: MatSort) {
    this.dataSource.sort = s;
    this.triggerTableSync();
  }

  triggerTableSync(): void {
    this.dataSource.sortingDataAccessor = (item: Car, property: string): string | number => {
      switch (property) {
        case 'brand': return item.brand?.brandName?.toLowerCase() || '';
        case 'model': return item.model?.toLowerCase() || '';
        case 'price': return item.price || 0;
        default: return (item as any)[property];
      }
    };

    this.dataSource.filter = '';
  }




  loadAllBrands(): void {
    this.carService.getAllBrands().subscribe({
      next: (brands) => {
        this.brandList = brands.map(b => b.brandName);
      },
      error: (err) => {
        console.error("Brand listesi alınamadı:", err);
      }
    });
  }

  loadCars() {
    this.carService.getCars().subscribe({
      next: data => {
        console.log("taken cars:",data);
        this.dataSource.data = data;
        this.setupFilterPredicate();
        this.dataSource.filter = '';
        this.table.renderRows();
      },
      error: (err) => {console.log("did not take cars:",err)}
    });
  }



  carDetails(carId: number) {
    this.router.navigate(['/car-detail', carId]);

  }

  selectedBrands: string[] = [];
  minPrice: number = 0;
  maxPrice: number = 0;
  maxEngineVolume: number = 4.5;

  filterByValues(): void {
    console.log("seçile markalar", this.selectedBrands)
    const filterObj = {
      selectedBrands: this.selectedBrands,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      maxEngineVolume: this.maxEngineVolume};
    this.dataSource.filter = JSON.stringify(filterObj) ;
  }

  setupFilterPredicate(): void {
    this.dataSource.filterPredicate = (car, filterJson) => {
      const filter = JSON.parse(filterJson);


      const brandMatch = !filter.selectedBrands?.length || filter.selectedBrands.includes(car.brandName);
      const priceMatch = (!filter.minPrice || car.price >= filter.minPrice) && (!filter.maxPrice || car.price <= filter.maxPrice);
      const engineMatch = !filter.maxEngineVolume || car.engineVolume <= filter.maxEngineVolume;

      console.log("filtered brands",filter.selectedBrands);
      return brandMatch && priceMatch && engineMatch;
    };
  }

}
