import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LigneListComponent } from './pages/ligne-list/ligne-list.component';
import { LigneFormComponent } from './pages/ligne-form/ligne-form.component';

const routes: Routes = [
  { path: '', component: LigneListComponent },
  { path: 'add', component: LigneFormComponent },
  { path: 'edit/:id', component: LigneFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LigneRoutingModule { }
