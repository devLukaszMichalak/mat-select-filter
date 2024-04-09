import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectFilterComponent } from './mat-select-filter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [MatSelectFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatInputModule
  ],
  exports: [MatSelectFilterComponent]
})
export class MatSelectFilterModule { }
