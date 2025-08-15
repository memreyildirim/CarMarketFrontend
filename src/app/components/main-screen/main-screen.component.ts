import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatButton,
    MatIcon,
    MatCard
  ],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.css'
})
export class MainScreenComponent {

}
