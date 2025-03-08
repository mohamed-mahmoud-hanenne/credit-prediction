import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PredictionComponent } from "./prediction/prediction.component";

@Component({
  selector: 'app-root',
  imports: [PredictionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'credit-prediction';
}
