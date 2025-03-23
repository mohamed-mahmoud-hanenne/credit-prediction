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
    this.http.post('https://projet-stocha.onrender.com/predict', this.formData).subscribe(
      (response) => {
        this.result = response;
      },
      (error) => {
        console.error('Erreur lors de la requête API', error);
      }
    );
  }

}
