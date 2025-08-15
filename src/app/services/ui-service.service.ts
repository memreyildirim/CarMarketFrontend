import { Injectable } from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";

@Injectable({ providedIn: 'root' })
export class UIService {
  private cartDrawer?: MatDrawer;


  //çıkış yapınca sepet kapatma olayına bakacağız
  closeCartDrawer(): void {
    this.cartDrawer?.close();
    console.log("selam")
  }
}

