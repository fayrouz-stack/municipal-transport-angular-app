import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// CoreUI Modules
import {
  AvatarModule,
  BadgeModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  PaginationModule,
  ProgressModule,
  TableModule,
  ToastModule,
  TooltipModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { VehiculeRoutingModule } from './vehicule-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    EditComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    VehiculeRoutingModule,
    AvatarModule,
    BadgeModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    IconModule,
    ModalModule,
    PaginationModule,
    ProgressModule,
    TableModule,
    ToastModule,
    TooltipModule
  ]
})
export class VehiculeModule { }