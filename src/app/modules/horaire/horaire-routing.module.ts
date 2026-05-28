import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoraireListComponent } from './pages/horaire-list/horaire-list.component';
import { HoraireFormComponent } from './pages/horaire-form/horaire-form.component';

const routes: Routes = [
  { path: '', component: HoraireListComponent },
  { path: 'add', component: HoraireFormComponent },
  { path: 'edit/:id', component: HoraireFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoraireRoutingModule { }
