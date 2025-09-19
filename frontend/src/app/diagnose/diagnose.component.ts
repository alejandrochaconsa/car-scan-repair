import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CarDiagnoseService } from './diagnose.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.css']
})
export class DiagnoseComponent {
  year = '';
  make = '';
  model = '';
  code = '';
  result: string = '';
  loading = false;

  constructor(private service: CarDiagnoseService) {}

  submit() {
    if (!this.year || !this.make || !this.model || !this.code) return;
    this.loading = true;
    this.result = '';

    this.service.diagnose(this.year, this.make, this.model, this.code)
      .subscribe({
        next: res => { this.result = res.result; this.loading = false; },
        error: err => { this.result = 'Error: ' + err.message; this.loading = false; }
      });
  }
}
