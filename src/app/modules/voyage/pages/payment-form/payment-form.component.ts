import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { VoyageService } from '../../services/voyage.service';
import { Voyage } from '../../models/voyage.model';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    QRCodeComponent                      // ← ajout
  ],
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  voyage: Voyage | null = null;
  passagerNom = '';
  passagerEmail = '';
  nbBillets = 1;
  methode = 'CB';
  paymentAmount: number | null = null;
  paymentResult: any = null;
  paymentError = '';
  paypalContact = 'paypal@transport.tn';

  constructor(
    private route: ActivatedRoute,
    private voyageService: VoyageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.voyageService.getById(+id).subscribe(v => this.voyage = v);
    }
  }

  get totalAmount(): number {
    if (!this.voyage) {
      return 0;
    }
    return this.voyage.prix * this.nbBillets;
  }

  onSubmit(): void {
    if (!this.voyage) {
      return;
    }

    this.paymentError = '';

    if (!this.passagerNom.trim()) {
      this.paymentError = 'Le nom du passager est requis.';
      return;
    }

    if (!this.passagerEmail.trim()) {
      this.paymentError = 'L\'email du passager est requis.';
      return;
    }

    if (this.nbBillets < 1 || this.nbBillets > this.voyage.nombrePlacesDisponible) {
      this.paymentError = 'Le nombre de billets est invalide.';
      return;
    }

    if (this.methode === 'Espèces') {
      if (this.paymentAmount === null || this.paymentAmount <= 0) {
        this.paymentError = 'Veuillez saisir le montant reçu en espèces.';
        return;
      }
      if (this.paymentAmount < this.totalAmount) {
        this.paymentError = 'Montant insuffisant pour couvrir le paiement.';
        return;
      }
    }

    const payload: any = {
      voyageId: this.voyage.id,
      nbBillets: this.nbBillets,
      methode: this.methode,
      passagerNom: this.passagerNom,
      passagerEmail: this.passagerEmail,
      paymentAmount: this.paymentAmount
    };

    this.voyageService.processPayment(payload).subscribe({
      next: (res) => {
        this.paymentResult = {
          ...res,
          qrdata: `TICKET:${res.ticketNumber}; PASSAGER:${this.passagerNom}; TOTAL:${res.total} DT`
        };
      },
      error: (err) => {
        this.paymentResult = null;
        this.paymentError = err?.message || 'Échec du paiement.';
      }
    });
  }
}
