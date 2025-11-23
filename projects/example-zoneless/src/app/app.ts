import {Component} from '@angular/core';
import {MatFormField} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatSelectFilterComponent} from "../../../lib/src/lib/mat-select-filter.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
    selector: 'app-root',
    imports: [
        MatFormField,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSelectFilterComponent], templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    variables: string[] = ['volvo', 'saab', 'mercedes', 'audi'];
    filteredVariables: string[] = this.variables;
}
