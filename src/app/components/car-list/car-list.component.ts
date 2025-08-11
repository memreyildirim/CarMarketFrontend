import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
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
import {CartServiceService} from "../../services/cart-service.service";
import {CartItem} from "../../models/cartItem";
import {MatIcon} from "@angular/material/icon";
import {AuthServiceService} from "../../services/auth-service.service";



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
    MatSliderModule,
    MatIcon
  ],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit{

  displayedColumns: string[] = ['photo','brand','model','price','actions']
  dataSource = new MatTableDataSource<Car>();


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Car>;
  protected brandList: string[] = [];
  cartItems: CartItem[] = [];

  constructor(private httpClient: HttpClient,
              private carService: CarServiceService,
              private router: Router,
              private cartService: CartServiceService,
              private authService: AuthServiceService,
              private cdref: ChangeDetectorRef) {

  }


  ngOnInit() {

    this.loadCars();
    this.loadAllBrands();
    this.cartItems = this.cartService.getItems();

    console.log("ngoninit çalıştı")


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.table.renderRows();
  }

  ngDoCheck() {
    this.isUser = this.authService.isUser();

    console.log("ngdocheck çalıştı")
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
  isUser: boolean = false;

  filterByValues(): void {
    console.log("seçile markalar", this.selectedBrands)
    const filterObj = {
      selectedBrands: this.selectedBrands,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      maxEngineVolume: this.maxEngineVolume};
    this.setupFilterPredicate();
    this.dataSource.filter = JSON.stringify(filterObj) ;
    console.log("filtrelenen araçlar", this.dataSource.filteredData)
    this.cdref.detectChanges();
    this.table.renderRows();
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

  goToAddCar() {
    this.router.navigate(['/car-form']);
  }
}

