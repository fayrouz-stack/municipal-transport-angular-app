/*import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoyageListComponent } from './pages/voyage-list/voyage-list.component';
import { VoyageFormComponent } from './pages/voyage-form/voyage-form.component';
import { PaymentFormComponent } from './pages/payment-form/payment-form.component';

const routes: Routes = [
  { path: '', component: VoyageListComponent },
  { path: 'add', component: VoyageFormComponent },
  { path: 'edit/:id', component: VoyageFormComponent },
  { path: 'payment/:id', component: PaymentFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoyageRoutingModule { }*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoyageListComponent } from './pages/voyage-list/voyage-list.component';
import { VoyageFormComponent } from './pages/voyage-form/voyage-form.component';
import { PaymentFormComponent } from './pages/payment-form/payment-form.component';

const routes: Routes = [
  { path: '', component: VoyageListComponent },
  { path: 'add', component: VoyageFormComponent },
  { path: 'edit/:id', component: VoyageFormComponent },
  { path: 'payment/:id', component: PaymentFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoyageRoutingModule { }