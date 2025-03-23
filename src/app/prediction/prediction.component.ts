import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-prediction',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.css'
})
export class PredictionComponent {

  formData = {
    Age: '',
    Revenu_Mensuel: '',
    Montant_Credit: '',
    Duree_Credit: '',
    Statut_Emploi: 'CDI',
    Nbr_Total_Credits: '',
    Nbr_Credits_Payes: '',
    Nbr_Credits_NonPayes: ''
  };

  result: any = null;

  constructor(private http: HttpClient) {}



  onSubmit() {
    this.http.post<{ Historique_Credit: string, Score_Global: number, Decision_Credit: string }>(
      'https://projet-stocha.onrender.com/predict',
      this.formData,
      { headers: { 'Content-Type': 'application/json' } } // Ajoute ceci pour éviter l'erreur 415
    ).subscribe(
      (response) => {
        Swal.fire({
          icon: response.Decision_Credit.toLowerCase() === "accepté" ? 'success' : 'error',
          title: `Décision : ${response.Decision_Credit}`,
          html: `
            <p><strong>Historique Crédit :</strong> ${response.Historique_Credit}</p>
            <p><strong>Score Global :</strong> ${response.Score_Global}</p>
          `
        });
      },
      (error) => {
        console.error('Erreur lors de la requête API', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la requête.'
        });
      }
    );
  }
  

}
