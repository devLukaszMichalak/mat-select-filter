import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectFilterComponent } from '../../../lib/src/lib/mat-select-filter.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatFormField,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSelectFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  variables: string[] = ['volvo', 'saab', 'mercedes', 'audi'];
  filteredVariables: string[] = this.variables;
  
  picked: any;
}
