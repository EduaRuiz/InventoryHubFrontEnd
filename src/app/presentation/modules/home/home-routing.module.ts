import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import {
  AuthGuardEmployee,
  AuthGuardSuperAdmin,
} from '@presentation/shared/guards';

const routes: Routes = [
  {
    path: 'home',
    component: LandingComponent,
  },
  {
    path: 'product',
    loadChildren: () => {
      return import('../product/product.module').then((m) => m.ProductModule);
    },
    canActivate: [AuthGuardEmployee],
  },
  {
    path: 'branch',
    loadChildren: () => {
      return import('../branch/branch.module').then((m) => m.BranchModule);
    },
    canActivate: [AuthGuardSuperAdmin],
  },
  {
    path: 'invoices',
    loadChildren: () => {
      return import('../sale/sale.module').then((m) => m.SaleModule);
    },
    canActivate: [AuthGuardEmployee],
  },
  {
    path: 'login',
    loadChildren: () => {
      return import('../user/user.module').then((m) => m.UserModule);
    },
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
