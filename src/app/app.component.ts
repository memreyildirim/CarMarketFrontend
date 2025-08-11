import {Component, OnInit, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {FooterComponent} from "./shared/footer/footer.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {CartItem} from "./models/cartItem";
import {CartServiceService} from "./services/cart-service.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    NavbarComponent,
    FooterComponent,
    MatDrawerContent,
    MatDrawerContainer,
    MatDrawer, CurrencyPipe, NgForOf, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  @ViewChild('drawer') drawer!: MatDrawer;
  title: string | undefined;
  cartItems: CartItem[] = [];


  constructor(private cartService: CartServiceService) {

  }

  ngOnInit() {
    this.title = 'car-market-frontend';
    this.cartService.items$.subscribe(items => {
      this.cartItems = items;
    });
  }

  clearCart() {
    this.cartService.clearCart();
  }

  removeItem(carId: number){
    console.log("remove item", carId);
    console.log("ıtems in cart", this.cartItems)
    this.cartService.removeItem(carId);
    this.cartItems = this.cartService.getItems();
  }



  get totalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
