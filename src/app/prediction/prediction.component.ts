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

  clientData = {
    Revenu_Mensuel: null,
    Montant_Credit: null,
    Duree_Credit: null,
    Age: null,
    Statut_Emploi: "CDI",  // Valeur par défaut
    Nbr_Total_Credits: null,
    Nbr_Credits_Payes: null,
    Nbr_Credits_NonPayes: null
  };

  result: any = null;

  constructor(private http: HttpClient) {}

  getKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
  

  submitForm() {
    this.http.post('http://127.0.0.1:5000/predict', this.clientData).subscribe({
      next: response => {
        console.log('Réponse du serveur:', response);
        this.result = response;
      },
      error: error => {
        console.error('Erreur lors de la requête:', error);
      }
    });
  }

}
