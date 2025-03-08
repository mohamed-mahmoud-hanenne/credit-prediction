import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prediction',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.css'
})
export class PredictionComponent {

  client = {
    revenuMensuel: '',
    montantCredit: '',
    dureeCredit: '',
    age: '',
    statutEmploi: '',
    nbrTotalCredits: '',
    nbrCreditsPayes: ''
  };

  decision: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  envoyerDonnees() {
    this.http.post<any>('http://localhost:5000/predict', this.client)
      .subscribe(
        response => {
          this.decision = response.decision;
          this.errorMessage = null;
        },
        error => {
          this.errorMessage = 'Erreur lors de la communication avec le serveur';
          this.decision = null;
        }
      );
  }

}
