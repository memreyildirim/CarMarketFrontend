import {RouterModule, Routes} from '@angular/router';
import {CarFormComponent} from "./components/car-form/car-form.component";
import {NgModule} from "@angular/core";
import {CarListComponent} from "./components/car-list/car-list.component";
import {AppComponent} from "./app.component";
import {CarDetailsComponent} from "./components/car-details/car-details.component";
import {CarUpdateComponent} from "./components/car-update/car-update.component";
import {BrandListComponent} from "./components/brand-list/brand-list.component";
import {LoginScreenComponent} from "./components/login-screen/login-screen.component";
import {authGuard} from "./guards/auth.guard";
import {MainScreenComponent} from "./components/main-screen/main-screen.component";

export const routes: Routes = [
  {path: '', component: MainScreenComponent , canActivate: [authGuard], data: {expectedRoles:['USER', 'ADMIN']}},
  {path: 'login-screen', component: LoginScreenComponent},
  {path: 'brand-list', component: BrandListComponent, canActivate: [authGuard], data: {expectedRoles: ['ADMIN']}},
  {path: 'car-detail/:id', component: CarDetailsComponent, canActivate: [authGuard], data: {expectedRoles:['USER', 'ADMIN']}},
  {path: "car-form", component: CarFormComponent, canActivate: [authGuard], data: {expectedRoles: 'ADMIN'}},
  {path: "update-car/:id", component: CarUpdateComponent, canActivate: [authGuard], data: {expectedRoles: 'ADMIN'}},
  {path: "car-list", component: CarListComponent, canActivate: [authGuard], data: {expectedRoles:['USER', 'ADMIN']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
