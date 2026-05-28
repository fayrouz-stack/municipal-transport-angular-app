import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VoyageRoutingModule } from './voyage-routing.module';
import { QRCodeComponent } from 'angularx-qrcode';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    VoyageRoutingModule,
    QRCodeComponent
  ]
})
export class VoyageModule { }