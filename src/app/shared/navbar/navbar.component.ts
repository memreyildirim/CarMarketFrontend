import {Component, Output, EventEmitter, DoCheck} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { MatIconButton } from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {routes} from "../../app.routes";
import {AuthServiceService} from "../../services/auth-service.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    MatIconButton,
    MatIcon,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements DoCheck {
  @Output() toggleDrawer = new EventEmitter<void>();

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;


  constructor(private router:Router,
              private authService: AuthServiceService) {
  }

  ngDoCheck() {
    this.isAdmin = this.authService.isAdmin();
    if (this.isAdmin) {
      console.log("admin girişi yapılıd");
    }
    this.isLoggedIn = this.authService.isLoggedIn();
  }





  openCart() {
    this.toggleDrawer.emit();
  }

  logout() {
    this.authService.logout();
  }

}
