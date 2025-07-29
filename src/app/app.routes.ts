import {RouterModule, Routes} from '@angular/router';
import {CarFormComponent} from "./components/car-form/car-form.component";
import {NgModule} from "@angular/core";
import {CarListComponent} from "./components/car-list/car-list.component";
import {AppComponent} from "./app.component";
import {CarDetailsComponent} from "./components/car-details/car-details.component";
import {CarUpdateComponent} from "./components/car-update/car-update.component";
import {BrandListComponent} from "./components/brand-list/brand-list.component";

export const routes: Routes = [
  //{path: '', component: CarListComponent},

  {path: 'brand-list', component: BrandListComponent},
  {path: 'car-detail/:id', component: CarDetailsComponent},
  {path: "car-form", component: CarFormComponent},
  {path: "update-car/:id", component: CarUpdateComponent},
  {path: "car-list", component: CarListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
