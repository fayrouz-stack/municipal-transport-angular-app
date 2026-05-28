import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StationListComponent } from './pages/station-list/station-list.component';
import { StationFormComponent } from './pages/station-form/station-form.component';

const routes: Routes = [
  { path: '', component: StationListComponent },
  { path: 'add', component: StationFormComponent },
  { path: 'edit/:id', component: StationFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationRoutingModule { }
